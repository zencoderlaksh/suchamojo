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

const sourceDir = path.join(__dirname, "..", "..", "frontend", "src", "assets", "HomPage");
const outputJsonPath = path.join(__dirname, "..", "..", "frontend", "src", "data", "imageKitMedia.json");

// Map source filenames to clean target filenames in ImageKit
const FILES_TO_UPLOAD = [
  { source: "DSC00237.webp", targetName: "DSC00237.webp" },
  { source: "DSC00242.webp", targetName: "DSC00242.webp" },
  { source: "DSC00335 (3).webp", targetName: "DSC00335.webp" },
  { source: "DSC00441.webp", targetName: "DSC00441.webp" },
  { source: "DSC00443 (1).webp", targetName: "DSC00443.webp" },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function uploadHomePageImages() {
  console.log(`[HOMEPAGE UPLOADER] Starting upload from: ${sourceDir}`);
  console.log(`[HOMEPAGE UPLOADER] ImageKit Endpoint: ${urlEndpoint}`);

  // Load existing metadata if available
  let existingData = {};
  if (fs.existsSync(outputJsonPath)) {
    try {
      existingData = JSON.parse(fs.readFileSync(outputJsonPath, "utf-8"));
    } catch (e) {
      console.warn("Could not parse existing imageKitMedia.json:", e.message);
    }
  }

  const uploadedEntries = {};

  for (let i = 0; i < FILES_TO_UPLOAD.length; i++) {
    const item = FILES_TO_UPLOAD[i];
    const fullPath = path.join(sourceDir, item.source);

    if (!fs.existsSync(fullPath)) {
      console.warn(`[SKIP] Missing file: ${item.source}`);
      continue;
    }

    try {
      const fileBuffer = fs.readFileSync(fullPath);
      const stat = fs.statSync(fullPath);
      const sizeMB = (stat.size / (1024 * 1024)).toFixed(2);

      console.log(`[${i + 1}/${FILES_TO_UPLOAD.length}] Uploading ${item.targetName} (${sizeMB} MB)...`);

      const res = await imagekit.upload({
        file: fileBuffer,
        fileName: item.targetName,
        folder: "/suchamojo/hero",
        useUniqueFileName: false,
        tags: ["suchamojo", "homepage", "hero", "banner"],
      });

      console.log(`  -> SUCCESS! URL: ${res.url}`);

      const entry = {
        fileId: res.fileId,
        name: res.name,
        filePath: res.filePath,
        url: res.url,
        thumbnailUrl: res.thumbnailUrl,
        width: res.width,
        height: res.height,
        size: res.size,
      };

      existingData[item.targetName] = entry;
      uploadedEntries[item.targetName] = entry;

      await sleep(300);
    } catch (err) {
      console.error(`  -> FAILED ${item.source}:`, err.message || err);
    }
  }

  // Update imageKitMedia.json
  fs.writeFileSync(outputJsonPath, JSON.stringify(existingData, null, 2), "utf-8");
  console.log(`\n[COMPLETE] Updated metadata saved to: ${outputJsonPath}`);
  console.log("Uploaded assets summary:", Object.keys(uploadedEntries));
}

uploadHomePageImages().catch(console.error);
