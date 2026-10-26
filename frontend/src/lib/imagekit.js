import imageKitMetadata from "../data/imageKitMedia.json";

export const IMAGEKIT_URL_ENDPOINT =
  import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/zyekgh52m";

export const IMAGEKIT_PUBLIC_KEY =
  import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY || "public_BGQWb2w8dSRNykyxGv706hOVCvA=";

/**
 * Build an optimized ImageKit transformation URL.
 *
 * @param {string} pathOrUrl - File path (e.g. "suchamojo/hero/client1.jpeg") or full ImageKit URL
 * @param {object} options - Transformation options
 * @param {number} [options.width] - Desired width (e.g. 600)
 * @param {number} [options.height] - Desired height (e.g. 600)
 * @param {number} [options.quality=80] - Image quality (1-100)
 * @param {string} [options.format='auto'] - Output format (auto, webp, avif)
 * @param {number} [options.blur] - Gaussian blur (1-100)
 * @param {string} [options.crop] - Crop strategy (maintain_ratio, force, at_max)
 * @returns {string} Fully qualified CDN URL with transformations
 */
export function getImageKitUrl(pathOrUrl, options = {}) {
  if (!pathOrUrl) return "";

  const endpoint = IMAGEKIT_URL_ENDPOINT.replace(/\/+$/, "");

  // If path is a local bundled path (starts with /src, blob:, data:, etc.), return as is
  if (
    pathOrUrl.startsWith("blob:") ||
    pathOrUrl.startsWith("data:") ||
    pathOrUrl.startsWith("/src") ||
    pathOrUrl.startsWith("http://localhost")
  ) {
    return pathOrUrl;
  }

  // Strip endpoint if full ImageKit URL was provided
  let cleanPath = pathOrUrl;
  if (cleanPath.startsWith(endpoint)) {
    cleanPath = cleanPath.slice(endpoint.length);
  }
  cleanPath = cleanPath.replace(/^\/+/, "");

  // Strip existing transformation parameters if any
  cleanPath = cleanPath.split("?")[0];

  // Build transformation parts
  const trParts = [];

  const width = options.width || options.w;
  if (width) trParts.push(`w-${width}`);

  const height = options.height || options.h;
  if (height) trParts.push(`h-${height}`);

  const quality = options.quality || options.q || 80;
  trParts.push(`q-${quality}`);

  const format = options.format || options.f || "auto";
  if (format) trParts.push(`f-${format}`);

  const blur = options.blur || options.bl;
  if (blur) trParts.push(`bl-${blur}`);

  const crop = options.crop || options.c;
  if (crop) trParts.push(`c-${crop}`);

  const trQuery = trParts.length > 0 ? `?tr=${trParts.join(",")}` : "";

  return `${endpoint}/${cleanPath}${trQuery}`;
}

/**
 * Generate a responsive srcSet string for an ImageKit asset.
 *
 * @param {string} pathOrUrl
 * @param {number[]} widths - Array of widths (e.g. [320, 640, 960, 1280])
 * @param {object} [extraOptions]
 * @returns {string}
 */
export function getImageKitSrcSet(pathOrUrl, widths = [320, 640, 960, 1280], extraOptions = {}) {
  if (!pathOrUrl) return "";
  return widths
    .map((w) => `${getImageKitUrl(pathOrUrl, { ...extraOptions, width: w })} ${w}w`)
    .join(", ");
}

/**
 * Pre-configured hero background media URLs stored on ImageKit CDN.
 * With optimal sizing and automatic WebP/AVIF compression.
 */
export const heroMedia = {
  heroBannerUpdated: getImageKitUrl("suchamojo/hero/Hero_Banner_-Updated.png", { width: 1400, quality: 85 }),
  heroShowreelPhoto: getImageKitUrl("suchamojo/hero/hero-showreel-photo.png", { width: 600, quality: 80 }),
  contentHeroBts: getImageKitUrl("suchamojo/hero/content-hero-bts.png", { width: 600, quality: 80 }),
  productionEngineSuite: getImageKitUrl("suchamojo/hero/production-engine-suite.png", { width: 600, quality: 80 }),
  storyboardingGrid: getImageKitUrl("suchamojo/hero/storyboarding-grid.png", { width: 600, quality: 80 }),
  trainingHeroCreating: getImageKitUrl("suchamojo/hero/training-hero-creating.png", { width: 600, quality: 80 }),
  trainingCorporateStudio: getImageKitUrl("suchamojo/hero/training-corporate-studio.png", { width: 600, quality: 80 }),
  trainingNgoField: getImageKitUrl("suchamojo/hero/training-ngo-field.png", { width: 600, quality: 80 }),
  trainingCorporateSpec: getImageKitUrl("suchamojo/hero/training-corporate-spec.png", { width: 600, quality: 80 }),
  trainingHeroSpec: getImageKitUrl("suchamojo/hero/training-hero-spec.png", { width: 600, quality: 80 }),
  engineSuitePhoto: getImageKitUrl("suchamojo/hero/engine-suite-photo.png", { width: 600, quality: 80 }),
  client1: getImageKitUrl("suchamojo/hero/client1.jpeg", { width: 400, quality: 80 }),
  client2: getImageKitUrl("suchamojo/hero/client2.jpeg", { width: 400, quality: 80 }),
  client3: getImageKitUrl("suchamojo/hero/client3.png", { width: 400, quality: 80 }),
  s9: getImageKitUrl("suchamojo/hero/s-9.jpg", { width: 600, quality: 80 }),
  s5: getImageKitUrl("suchamojo/hero/s-5.jpg", { width: 600, quality: 80 }),
  abc1: getImageKitUrl("suchamojo/hero/abc1.png", { width: 600, quality: 80 }),
  ab2: getImageKitUrl("suchamojo/hero/ab2.png", { width: 600, quality: 80 }),
  ab3: getImageKitUrl("suchamojo/hero/ab3.png", { width: 600, quality: 80 }),
  j1: getImageKitUrl("suchamojo/hero/j1.png", { width: 600, quality: 80 }),
  j2: getImageKitUrl("suchamojo/hero/j2.png", { width: 600, quality: 80 }),
  j3: getImageKitUrl("suchamojo/hero/j3.png", { width: 600, quality: 80 }),
  c1: getImageKitUrl("suchamojo/hero/c1.png", { width: 600, quality: 80 }),
  c2: getImageKitUrl("suchamojo/hero/c2.png", { width: 600, quality: 80 }),
  c3: getImageKitUrl("suchamojo/hero/c3.png", { width: 600, quality: 80 }),
  c4: getImageKitUrl("suchamojo/hero/c4.png", { width: 600, quality: 80 }),
  backgroundImg1: getImageKitUrl("suchamojo/hero/background-img1.jpg", { width: 1200, quality: 80 }),
  backgroundImg2: getImageKitUrl("suchamojo/hero/background-img2.jpg", { width: 1200, quality: 80 }),
  l1: getImageKitUrl("suchamojo/hero/l1.png", { width: 1200, quality: 80 }),
  pomergranate: getImageKitUrl("suchamojo/hero/pomergranate.jpeg", { width: 600, quality: 80 }),
  icedTea: getImageKitUrl("suchamojo/hero/iced-tea.jpeg", { width: 600, quality: 80 }),
  // Authentic Home Page photoshoot photography from assets/HomPage (ImageKit CDN hosted)
  homeBanner1: getImageKitUrl("suchamojo/hero/DSC00237.webp", { width: 1200, quality: 85 }),
  homeBanner2: getImageKitUrl("suchamojo/hero/DSC00242.webp", { width: 1200, quality: 85 }),
  homeBanner3: getImageKitUrl("suchamojo/hero/DSC00335.webp", { width: 1200, quality: 85 }),
  homeBanner4: getImageKitUrl("suchamojo/hero/DSC00441.webp", { width: 1200, quality: 85 }),
  homeBanner5: getImageKitUrl("suchamojo/hero/DSC00443.webp", { width: 1200, quality: 85 }),
  dsc00237: getImageKitUrl("suchamojo/hero/DSC00237.webp", { width: 1200, quality: 85 }),
  dsc00242: getImageKitUrl("suchamojo/hero/DSC00242.webp", { width: 1200, quality: 85 }),
  dsc00335: getImageKitUrl("suchamojo/hero/DSC00335.webp", { width: 1200, quality: 85 }),
  dsc00441: getImageKitUrl("suchamojo/hero/DSC00441.webp", { width: 1200, quality: 85 }),
  dsc00443: getImageKitUrl("suchamojo/hero/DSC00443.webp", { width: 1200, quality: 85 }),
};

export const homeBannerPhotos = [
  heroMedia.dsc00237,
  heroMedia.dsc00242,
  heroMedia.dsc00335,
  heroMedia.dsc00441,
  heroMedia.dsc00443,
];

export { imageKitMetadata };
