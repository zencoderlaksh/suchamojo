import React, { useState } from "react";
import { getImageKitUrl, getImageKitSrcSet } from "../lib/imagekit";

/**
 * IKImage: Robust, high-performance responsive image component powered by ImageKit.
 *
 * Features:
 * - Automatic CDN delivery
 * - Auto WebP/AVIF format optimization
 * - Responsive srcset generation
 * - Graceful fallback to local asset if network or CDN fails
 * - Native lazy loading with decode="async"
 */
const IKImage = ({
  src,
  alt = "",
  width,
  height,
  quality = 80,
  fallback,
  className = "",
  loading = "lazy",
  priority = false,
  sizes,
  responsiveWidths,
  style,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  // If error occurred or no src, try fallback
  if (hasError && fallback) {
    return (
      <img
        src={fallback}
        alt={alt}
        className={className}
        loading={priority ? "eager" : loading}
        decoding="async"
        style={style}
        {...props}
      />
    );
  }

  const finalSrc = getImageKitUrl(src, { width, height, quality });
  const srcSet = responsiveWidths
    ? getImageKitSrcSet(src, responsiveWidths, { quality })
    : undefined;

  return (
    <img
      src={finalSrc}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? "eager" : loading}
      decoding="async"
      style={style}
      onError={() => {
        if (fallback) setHasError(true);
      }}
      {...props}
    />
  );
};

export default IKImage;
