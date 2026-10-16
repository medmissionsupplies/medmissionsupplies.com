import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';
import { routes } from '../src/routes.mjs';
import { equipment, photoUrl } from '../src/catalog.mjs';
import { articles } from '../src/articles.mjs';
import { socialContentFor, socialImagePath, socialImageSize } from '../src/social-metadata.mjs';

// Prebuilt JPEG previews work for social crawlers without JavaScript or cookies.
// Webpage photographs continue through the separate responsive WebP pipeline.
const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'public/assets/social');
const fontRoot = path.join(root, 'node_modules/@ibm/plex/IBM-Plex-Sans/fonts/complete/woff');
const fontFile = path.join(fontRoot, 'IBMPlexSans-SemiBold.woff');
const logoInput = await readFile(path.join(root, 'public/assets/mms-logo.png'));
const logo = await sharp(logoInput).trim().resize(86, 86).png().toBuffer();
const generatorHash = createHash('sha256')
  .update(await readFile(fileURLToPath(import.meta.url)))
  .update(logoInput)
  .update(await readFile(fontFile))
  .digest('hex');
const manifestPath = path.join(output, 'manifest.json');
let previous = {};
try { previous = JSON.parse(await readFile(manifestPath, 'utf8')).cards ?? {}; } catch { /* First build. */ }
await mkdir(output, { recursive: true });
const xml = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

// Pango uses the bundled IBM Plex fonts, and reports actual pixel bounds.
// Keep type within its own box; do not crop or guess character widths.
async function textLayer(value, { x, y, width, height, size, color = '#ffffff', minimum = size }) {
  for (let current = size; current >= minimum; current -= 2) {
    const layer = await sharp({ text: {
      text: `<span foreground="${color}">${xml(value)}</span>`,
      font: `IBM Plex Sans SemiBold ${current}`,
      fontfile: fontFile,
      width, rgba: true, spacing: 2,
    } }).png().toBuffer({ resolveWithObject: true });
    if (layer.info.width <= width && layer.info.height <= height) return { input: layer.data, left: x, top: y };
  }
  throw new Error(`Social card text exceeds its safe bounds: ${value}`);
}

const frame = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs><linearGradient id="navy" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#082b49"/><stop offset="1" stop-color="#041a30"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#navy)"/>
  <path d="M1100 0H1200V630H700Z" fill="#0d4266"/>
  <path d="M1170 0H1200V630H770Z" fill="#135779" opacity=".5"/>
  <rect x="55" y="155" width="56" height="5" fill="#ffbd35"/>
  <rect x="767" y="61" width="377" height="498" rx="6" fill="#eff5f8"/>
  <rect x="767" y="61" width="377" height="7" fill="#ffbd35"/>
  <rect x="55" y="551" width="650" height="1" fill="#416078"/>
</svg>`);
const cards = {};
let generated = 0;
for (const route of routes) {
  const item = route.equipmentId ? equipment.find(item => item.id === route.equipmentId) : route.articleId ? articles.find(item => item.id === route.articleId) : null;
  const content = socialContentFor(route, item);
  const source = photoUrl(content.image);
  const photoInput = await readFile(path.join(root, 'public', source));
  const fingerprint = createHash('sha256').update(generatorHash).update(JSON.stringify(content)).update(photoInput).digest('hex');
  const image = socialImagePath(route.key);
  const target = path.join(root, 'public', image);
  let file;
  if (previous[route.key]?.fingerprint === fingerprint) {
    try { file = await stat(target); } catch { /* Recreate a missing output. */ }
  }
  if (!file) {
    const photograph = await sharp(photoInput).rotate().resize(333, 357, {
      fit: 'contain', background: '#eff5f8',
    }).flatten({ background: '#eff5f8' }).png().toBuffer();
    const overlays = [
      { input: logo, left: 55, top: 48 },
      { input: photograph, left: 789, top: 130 },
      await textLayer('MED MISSION\nSUPPLIES', { x: 157, y: 62, width: 540, height: 65, size: 24, bold: true }),
      await textLayer(content.label.toUpperCase(), { x: 55, y: 181, width: 651, height: 31, size: 18, minimum: 16, color: '#ffcf75', bold: true }),
      await textLayer(content.headline, { x: 51, y: 226, width: 658, height: 230, size: 65, minimum: 47, bold: true }),
      await textLayer(content.strapline, { x: 55, y: 478, width: 650, height: 58, size: 23, minimum: 21, color: '#d4e5ef' }),
      await textLayer('medmissionsupplies.com', { x: 55, y: 578, width: 650, height: 24, size: 20, color: '#c1d5e3' }),
      await textLayer('ILLUSTRATIVE EQUIPMENT', { x: 789, y: 521, width: 333, height: 22, size: 14, color: '#516776' }),
    ];
    await sharp(frame).composite(overlays).jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: '4:4:4' }).toFile(target);
    file = await stat(target);
    generated++;
  }
  if (file.size > 220 * 1024) throw new Error(`${image} exceeds the 220 KB social preview budget`);
  cards[route.key] = { image, source, width: socialImageSize.width, height: socialImageSize.height, bytes: file.size, fingerprint };
}
await writeFile(manifestPath, JSON.stringify({ format: 'jpeg', ...socialImageSize, cards }, null, 2) + '\n');
console.log(`Social previews: ${routes.length} cards; ${generated} generated, ${routes.length - generated} cached; ${Math.round(Object.values(cards).reduce((total, card) => total + card.bytes, 0) / 1024)} KB total.`);
