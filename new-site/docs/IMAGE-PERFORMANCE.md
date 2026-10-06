# Responsive WebP page images

`npm run build` and `npm run dev` generate WebP variants for every local JPEG, PNG, WebP and AVIF in `public`. Original files remain intact for source records, full-size downloads and social-sharing metadata. SVG artwork stays vector.

Use `src/OptimizedImage` for displayed bitmaps and pass a `sizes` value that matches their CSS display width. Generated assets use content hashes and widths from 96 to 1920 pixels, never enlarged beyond the source. Below-fold images default to lazy loading; banners and header logos explicitly opt into eager loading. No external image service or request-time conversion is involved.

`scripts/optimize-images.mjs` and pinned `sharp` generate `public/media/optimized` and `src/image-manifest.generated.json`. Both are ignored build output and generated again in CI. Change the encoder settings version when changing quality. The original page design, wording and image identities are preserved.

Release checks cover rendered WebP URLs and each responsive candidate, along with existing page, form and SEO checks. Check desktop/mobile screenshots and public image MIME types after deployment.
