import { readdir, readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

// Generate once at build time, never on the visitor's first request. Originals
// remain available for full-size archive links and source/permission records.
const root = path.resolve('public');
const output = path.join(root, 'media/optimized');
const widths = [96, 192, 384, 640, 960, 1440, 1920];
const settings = 'webp-v1-quality84-effort5-orient-srgb';
await mkdir(output, { recursive: true });
async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.filter(e => path.join(dir, e.name) !== output).map(e =>
    e.isDirectory() ? files(path.join(dir, e.name)) : path.join(dir, e.name)))).flat();
}
const sources = (await files(root)).filter(f => /\.(jpe?g|png|webp|avif)$/i.test(f)).sort();
const manifest = {};
let originalBytes = 0, displayBytes = 0, variants = 0;
// Bounded batches keep memory and build CPU predictable.
for (let offset = 0; offset < sources.length; offset += 4) {
  await Promise.all(sources.slice(offset, offset + 4).map(async file => {
    const input = await readFile(file);
    const metadata = await sharp(input).metadata();
    if ((metadata.pages ?? 1) > 1 && metadata.format !== 'heif') throw new Error(`Animated image needs explicit handling: ${file}`);
    const { width, height } = metadata.autoOrient;
    const hash = createHash('sha256').update(settings).update(input).digest('hex').slice(0, 20);
    const sizes = [...widths.filter(w => w < width), Math.min(width, widths.at(-1))].filter((w, i, a) => a.indexOf(w) === i);
    for (const size of sizes) {
      const target = path.join(output, `${hash}-${size}.webp`);
      try { await stat(target); } catch {
        const converted = await sharp(input).rotate().resize({ width: size, withoutEnlargement: true }).webp({ quality: 84, effort: 5 }).toBuffer();
        // Avoid making an already-efficient, correctly oriented WebP larger.
        const useOriginal = metadata.format === 'webp' && size === width && (!metadata.orientation || metadata.orientation === 1) && input.length < converted.length;
        await writeFile(target, useOriginal ? input : converted);
      }
      variants++;
    }
    manifest['/' + path.relative(root, file).split(path.sep).join('/')] = [hash, width, height, sizes];
    originalBytes += input.length;
    const largestBytes = (await stat(path.join(output, `${hash}-${sizes.at(-1)}.webp`))).size;
    displayBytes += largestBytes;
  }));
}
await writeFile('src/image-manifest.generated.json', JSON.stringify(Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)))) + '\n');
console.log(JSON.stringify({ images: sources.length, variants, originalBytes, largestWebpBytes: displayBytes, reduction: `${(100 * (1 - displayBytes / originalBytes)).toFixed(1)}%` }));
