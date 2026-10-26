const ImageKit = require("imagekit");
const dotenv = require("dotenv");

dotenv.config();

let imagekitInstance = null;

const getImageKit = () => {
  if (!imagekitInstance) {
    const publicKey = process.env.IMAGEKIT_PUBLIC_KEY || "public_BGQWb2w8dSRNykyxGv706hOVCvA=";
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY || "private_INKfqZQRmsEudQlPSSBtLaEk77w=";
    const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/zyekgh52m";

    if (!publicKey || !privateKey || !urlEndpoint) {
      console.warn("[IMAGEKIT] Warning: ImageKit credentials missing from environment.");
    }

    imagekitInstance = new ImageKit({
      publicKey,
      privateKey,
      urlEndpoint,
    });
  }
  return imagekitInstance;
};

module.exports = {
  getImageKit,
  imagekit: getImageKit(),
};
