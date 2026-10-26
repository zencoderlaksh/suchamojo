const fs = require("fs");
const path = require("path");
const ImageKit = require("imagekit");
const dotenv = require("dotenv");

// Load backend .env
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const publicKey = process.env.IMAGEKIT_PUBLIC_KEY || "public_BGQWb2w8dSRNykyxGv706hOVCvA=";
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY || "private_INKfqZQRmsEudQlPSSBtLaEk77w=";
const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/zyekgh52m";

const imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

// Targeted media list for the hero background & interactive grid
const MEDIA_FILES = [
  "Hero Banner -Updated.png",
  "hero-showreel-photo.png",
  "content-hero-bts.png",
  "production-engine-suite.png",
  "storyboarding-grid.png",
  "training-hero-creating.png",
  "training-corporate-studio.png",
  "training-ngo-field.png",
  "training-corporate-spec.png",
  "training-hero-spec.png",
  "engine-suite-photo.png",
  "client1.jpeg",
  "client2.jpeg",
  "client3.png",
  "s-9.jpg",
  "s-5.jpg",
  "abc1.png",
  "ab2.png",
  "ab3.png",
  "j1.png",
  "j2.png",
  "j3.png",
  "c1.png",
  "c2.png",
  "c3.png",
  "c4.png",
  "background-img1.jpg",
  "background-img2.jpg",
  "l1.png",
  "pomergranate.jpeg",
  "iced-tea.jpeg",
];

const sourceDir = path.join(__dirname, "..", "..", "frontend", "src", "assets", "image");
const outputJsonPath = path.join(__dirname, "..", "..", "frontend", "src", "data", "imageKitMedia.json");

// Helper to delay between uploads to respect API rates
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function uploadAll() {
  console.log(`[IMAGEKIT UPLOADER] Starting upload of ${MEDIA_FILES.length} background media files...`);
  console.log(`[IMAGEKIT UPLOADER] Target endpoint: ${urlEndpoint}`);
  console.log(`[IMAGEKIT UPLOADER] Source directory: ${sourceDir}`);

  const results = {};

  for (let i = 0; i < MEDIA_FILES.length; i++) {
    const fileName = MEDIA_FILES[i];
    const fullPath = path.join(sourceDir, fileName);

    if (!fs.existsSync(fullPath)) {
      console.warn(`[SKIP] File not found: ${fileName}`);
      continue;
    }

    try {
      const fileBuffer = fs.readFileSync(fullPath);
      const stat = fs.statSync(fullPath);
      const sizeMB = (stat.size / (1024 * 1024)).toFixed(2);

      console.log(`[${i + 1}/${MEDIA_FILES.length}] Uploading ${fileName} (${sizeMB} MB)...`);

      const res = await imagekit.upload({
        file: fileBuffer,
        fileName: fileName,
        folder: "/suchamojo/hero",
        useUniqueFileName: false,
        tags: ["suchamojo", "hero", "background"],
      });

      console.log(`  -> OK: ${res.url}`);
      results[fileName] = {
        fileId: res.fileId,
        name: res.name,
        filePath: res.filePath,
        url: res.url,
        thumbnailUrl: res.thumbnailUrl,
        width: res.width,
        height: res.height,
        size: res.size,
      };

      // Gentle pause to avoid rate limits
      await sleep(300);
    } catch (err) {
      console.error(`  -> FAILED ${fileName}:`, err.message || err);
    }
  }

  // Ensure frontend/src/data directory exists
  const dataDir = path.dirname(outputJsonPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Write mapping JSON
  fs.writeFileSync(outputJsonPath, JSON.stringify(results, null, 2), "utf-8");
  console.log(`\n[COMPLETE] Successfully saved ImageKit metadata to ${outputJsonPath}`);
  console.log(`Uploaded ${Object.keys(results).length} media files to ImageKit!`);
}

uploadAll().catch(console.error);
