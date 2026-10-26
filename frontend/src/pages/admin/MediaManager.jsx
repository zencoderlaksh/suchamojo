import React, { useState, useEffect, useRef } from "react";
import { fetchMediaAssets, uploadMediaAsset, deleteMediaAsset } from "../../lib/api";
import { IMAGEKIT_URL_ENDPOINT, getImageKitUrl } from "../../lib/imagekit";

const MediaManager = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [search, setSearch] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("/suchamojo");
  const [copiedId, setCopiedId] = useState(null);
  const [uploadFolder, setUploadFolder] = useState("/suchamojo/uploads");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const loadFiles = async (folderPath = selectedFolder) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetchMediaAssets({ path: folderPath, limit: 100 });
      if (res && res.data) {
        setFiles(res.data);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch files from ImageKit");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFiles(selectedFolder);
  }, [selectedFolder]);

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    try {
      setUploading(true);
      setError("");
      setSuccessMsg("");

      // Read file as base64
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Data = reader.result;
          await uploadMediaAsset({
            file: base64Data,
            fileName: selectedFile.name,
            folder: uploadFolder,
            tags: ["suchamojo", "admin-upload"],
          });

          setSuccessMsg(`"${selectedFile.name}" uploaded successfully to ${uploadFolder}!`);
          setSelectedFile(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
          loadFiles(selectedFolder);
        } catch (uploadErr) {
          setError(uploadErr.message || "Failed to upload asset");
        } finally {
          setUploading(false);
        }
      };
      reader.onerror = () => {
        setError("Error reading file");
        setUploading(false);
      };
      reader.readAsDataURL(selectedFile);
    } catch (err) {
      setError(err.message || "Upload failed");
      setUploading(false);
    }
  };

  const handleDelete = async (fileId, fileName) => {
    if (!window.confirm(`Are you sure you want to delete "${fileName}" from ImageKit?`)) {
      return;
    }
    try {
      setError("");
      await deleteMediaAsset(fileId);
      setSuccessMsg(`Deleted "${fileName}" successfully`);
      setFiles((prev) => prev.filter((f) => f.fileId !== fileId));
    } catch (err) {
      setError(err.message || "Failed to delete file");
    }
  };

  const filteredFiles = files.filter((f) =>
    (f.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const formatBytes = (bytes) => {
    if (!bytes || bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">
            Media Library (ImageKit)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Global CDN delivery, automated WebP/AVIF transformation and storage.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[11px] truncate max-w-xs">{IMAGEKIT_URL_ENDPOINT}</span>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-400">
          {error}
        </div>
      )}

      {successMsg && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-400">
          {successMsg}
        </div>
      )}

      {/* Upload Box */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-orange-400 mb-3">
          Upload New Asset to ImageKit
        </h2>

        <form onSubmit={handleUpload} className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="flex-1 w-full">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="w-full text-xs text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600 cursor-pointer"
            />
          </div>

          <div className="w-full sm:w-48">
            <select
              value={uploadFolder}
              onChange={(e) => setUploadFolder(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-xs text-white outline-none focus:border-orange-500"
            >
              <option value="/suchamojo/uploads">/suchamojo/uploads</option>
              <option value="/suchamojo/hero">/suchamojo/hero</option>
              <option value="/suchamojo/blogs">/suchamojo/blogs</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={!selectedFile || uploading}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-orange-500 text-white text-xs font-bold uppercase tracking-wider hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {uploading ? "Uploading..." : "Upload File"}
          </button>
        </form>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Folder Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {[
            { label: "All Media", path: "/suchamojo" },
            { label: "Hero Backgrounds", path: "/suchamojo/hero" },
            { label: "Uploads", path: "/suchamojo/uploads" },
          ].map((tab) => (
            <button
              key={tab.path}
              onClick={() => setSelectedFolder(tab.path)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition ${
                selectedFolder === tab.path
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                  : "bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Search assets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 text-xs">
          Loading assets from ImageKit...
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className="py-20 text-center text-slate-500 text-xs">
          No files found in {selectedFolder}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredFiles.map((file) => {
            const isCopied = copiedId === file.fileId;
            const optimizedThumb = file.fileType === "image"
              ? getImageKitUrl(file.filePath, { width: 300, quality: 75 })
              : file.thumbnail || file.url;

            return (
              <div
                key={file.fileId}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2.5 transition hover:border-orange-500/50 hover:bg-white/10"
              >
                {/* Image Preview */}
                <div className="relative aspect-video sm:aspect-square w-full overflow-hidden rounded-xl bg-black/40">
                  <img
                    src={optimizedThumb}
                    alt={file.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[9px] font-mono text-slate-300">
                    {file.width && file.height ? `${file.width}×${file.height}` : file.fileType}
                  </div>
                </div>

                {/* Metadata */}
                <div className="mt-2.5 space-y-1">
                  <p className="truncate text-xs font-semibold text-slate-200" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {formatBytes(file.size)}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-3 flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(file.url, file.fileId)}
                    className={`flex-1 rounded-lg py-1.5 text-[10px] font-bold uppercase tracking-wider transition ${
                      isCopied
                        ? "bg-emerald-500 text-white"
                        : "bg-white/10 text-slate-200 hover:bg-orange-500 hover:text-white"
                    }`}
                  >
                    {isCopied ? "Copied!" : "Copy URL"}
                  </button>

                  <button
                    onClick={() => handleDelete(file.fileId, file.name)}
                    className="rounded-lg bg-red-500/10 p-1.5 text-red-400 hover:bg-red-500 hover:text-white transition"
                    title="Delete file"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MediaManager;
