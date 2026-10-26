const { getImageKit } = require("../config/imagekit");

/**
 * Provides ImageKit client-side upload authentication parameters:
 * token, expire, and signature.
 */
const getAuthParams = (req, res) => {
  try {
    const ik = getImageKit();
    const authParams = ik.getAuthenticationParameters();
    return res.status(200).json(authParams);
  } catch (error) {
    console.error("[IMAGEKIT AUTH ERROR]:", error.message);
    return res.status(500).json({
      message: "Failed to generate ImageKit authentication parameters",
      error: error.message,
    });
  }
};

/**
 * Server-side upload to ImageKit.
 * Accepts: file (base64 string or binary or URL), fileName, folder, tags
 */
const uploadMedia = async (req, res) => {
  try {
    const { file, fileName, folder = "/suchamojo/uploads", tags = [] } = req.body;

    if (!file || !fileName) {
      return res.status(400).json({
        message: "File and fileName are required",
      });
    }

    const ik = getImageKit();
    const result = await ik.upload({
      file,
      fileName,
      folder,
      tags: Array.isArray(tags) ? tags : [tags],
      useUniqueFileName: false,
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("[IMAGEKIT UPLOAD ERROR]:", error.message);
    return res.status(500).json({
      message: "Failed to upload file to ImageKit",
      error: error.message,
    });
  }
};

/**
 * List files from ImageKit
 */
const listMedia = async (req, res) => {
  try {
    const { path = "/suchamojo", limit = 50, skip = 0 } = req.query;
    const ik = getImageKit();

    const files = await ik.listFiles({
      path,
      limit: parseInt(limit, 10),
      skip: parseInt(skip, 10),
    });

    return res.status(200).json({
      success: true,
      count: files.length,
      data: files,
    });
  } catch (error) {
    console.error("[IMAGEKIT LIST ERROR]:", error.message);
    return res.status(500).json({
      message: "Failed to list files from ImageKit",
      error: error.message,
    });
  }
};

/**
 * Delete a file from ImageKit by fileId
 */
const deleteMedia = async (req, res) => {
  try {
    const { fileId } = req.params;
    if (!fileId) {
      return res.status(400).json({ message: "File ID is required" });
    }

    const ik = getImageKit();
    await ik.deleteFile(fileId);

    return res.status(200).json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error("[IMAGEKIT DELETE ERROR]:", error.message);
    return res.status(500).json({
      message: "Failed to delete file from ImageKit",
      error: error.message,
    });
  }
};

module.exports = {
  getAuthParams,
  uploadMedia,
  listMedia,
  deleteMedia,
};
