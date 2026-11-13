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
 * Accepts: file (base64 string or binary or URL), fileName, folder, tags, oldFileId
 */
const uploadMedia = async (req, res) => {
  try {
    const {
      file,
      fileName,
      folder = "/suchamojo/uploads",
      tags = [],
      useUniqueFileName = false,
      overwriteFile = true,
      oldFileId,
    } = req.body;

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
      useUniqueFileName: Boolean(useUniqueFileName),
      overwriteFile: Boolean(overwriteFile),
    });

    // If replacing an old file and the new file has a different fileId, delete the old file
    if (oldFileId && result.fileId && oldFileId !== result.fileId) {
      try {
        await ik.deleteFile(oldFileId);
      } catch (delErr) {
        console.warn("[IMAGEKIT CLEANUP WARN]:", delErr.message);
      }
    }

    // Purge CDN cache so the new image is delivered immediately
    if (result.url) {
      try {
        await ik.purgeCache(result.url);
      } catch (purgeErr) {
        console.warn("[IMAGEKIT PURGE WARN]:", purgeErr.message);
      }
    }

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
    const { path = "all", limit = 100, skip = 0, search } = req.query;
    const ik = getImageKit();

    const options = {
      limit: parseInt(limit, 10),
      skip: parseInt(skip, 10),
    };

    if (path && path !== "all" && path !== "/suchamojo/all") {
      options.path = path;
    }

    if (search) {
      options.searchQuery = `name : "${search}"`;
    }

    const files = await ik.listFiles(options);

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
 * Rename a file in ImageKit
 */
const renameMedia = async (req, res) => {
  try {
    const { filePath, newFileName, purgeCache = true } = req.body;
    if (!filePath || !newFileName) {
      return res.status(400).json({ message: "filePath and newFileName are required" });
    }

    const ik = getImageKit();
    const result = await ik.renameFile({ filePath, newFileName, purgeCache });

    return res.status(200).json({
      success: true,
      message: "File renamed successfully",
      data: result,
    });
  } catch (error) {
    console.error("[IMAGEKIT RENAME ERROR]:", error.message);
    return res.status(500).json({
      message: "Failed to rename file in ImageKit",
      error: error.message,
    });
  }
};

/**
 * Update file details (tags, coordinates) in ImageKit
 */
const updateMediaDetails = async (req, res) => {
  try {
    const { fileId } = req.params;
    const { tags, removeTags } = req.body;
    if (!fileId) {
      return res.status(400).json({ message: "File ID is required" });
    }

    const ik = getImageKit();
    const updateData = {};
    if (tags !== undefined) updateData.tags = Array.isArray(tags) ? tags : [tags];
    if (removeTags !== undefined) updateData.removeTags = removeTags;

    const result = await ik.updateFileDetails(fileId, updateData);

    return res.status(200).json({
      success: true,
      message: "File details updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("[IMAGEKIT UPDATE ERROR]:", error.message);
    return res.status(500).json({
      message: "Failed to update file details in ImageKit",
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
  renameMedia,
  updateMediaDetails,
  deleteMedia,
};
