import React from "react";
import manifest from "./image-manifest.generated.json";


// A normal, server-rendered image: no hydration or request-time conversion.
export default function OptimizedImage({ src, sizes, loading, decoding = "async", fetchPriority, width, height, ...props }) {
  const entry = manifest[src];
  if (!entry) return <img {...props} src={src} sizes={sizes} width={width} height={height} loading={loading} decoding={decoding} fetchPriority={fetchPriority} />;
  const [hash, sourceWidth, sourceHeight, widths] = entry;
  const url = (w) => `/media/optimized/${hash}-${w}.webp`;
  return <img {...props} src={url(widths.find(w => w >= 800) ?? widths.at(-1))}
    srcSet={widths.map(w => `${url(w)} ${w}w`).join(", ")} sizes={sizes}
    width={width ?? sourceWidth} height={height ?? sourceHeight}
    loading={loading ?? (fetchPriority === "high" ? "eager" : "lazy")}
    decoding={decoding} fetchPriority={fetchPriority} />;
}
