import React, { useState, useEffect, useRef } from "react";
import {
  fetchMediaAssets,
  uploadMediaAsset,
  deleteMediaAsset,
  renameMediaAsset,
  updateMediaAssetDetails,
} from "../../lib/api";
import { IMAGEKIT_URL_ENDPOINT, getImageKitUrl } from "../../lib/imagekit";

const PAGE_FOLDERS = [
  { id: "all", label: "All Assets", path: "all", desc: "All files across ImageKit" },
  { id: "home", label: "Home Page", path: "/suchamojo/pages/home", desc: "Homepage banners, clients, and hero visual assets" },
  { id: "hero", label: "Hero / Banners", path: "/suchamojo/hero", desc: "Showreel photos, bts scenes, and studio shots" },
  { id: "personal-branding", label: "Personal Branding", path: "/suchamojo/pages/personal-branding", desc: "Executive branding, frameworks, and portrait media" },
  { id: "content-creation", label: "Content Creation", path: "/suchamojo/pages/content-creation", desc: "Camera equipment, video reels, and production engine" },
  { id: "team-training", label: "Team Training", path: "/suchamojo/pages/team-training", desc: "Workshops, training sessions, and studio setups" },
  { id: "about", label: "About Page", path: "/suchamojo/pages/about", desc: "Founder journey, milestone photos, and team culture" },
  { id: "blogs", label: "Blogs", path: "/suchamojo/pages/blogs", desc: "Blog post thumbnails, cover images, and article figures" },
  { id: "testimonials", label: "Testimonials", path: "/suchamojo/pages/testimonials", desc: "Client headshots, testimonials, and brand logos" },
  { id: "uploads", label: "General Uploads", path: "/suchamojo/uploads", desc: "General assets, misc media, and unsorted files" },
];

const MediaManager = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("/suchamojo/hero");
  const [copiedId, setCopiedId] = useState(null);

  // Upload state
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadFolder, setUploadFolder] = useState("/suchamojo/hero");
  const [customFileName, setCustomFileName] = useState("");
  const [uploadTags, setUploadTags] = useState("");
  const fileInputRef = useRef(null);

  // Edit/Rename/Replace Modal State
  const [editingFile, setEditingFile] = useState(null);
  const [editTab, setEditTab] = useState("replace"); // "replace" | "details"
  const [editFileName, setEditFileName] = useState("");
  const [editTags, setEditTags] = useState("");
  const [replacementFile, setReplacementFile] = useState(null);
  const [replacementPreview, setReplacementPreview] = useState("");
  const [keepSameFileName, setKeepSameFileName] = useState(true);
  const [replacing, setReplacing] = useState(false);
  const replaceInputRef = useRef(null);

  // Preview Modal
  const [previewFile, setPreviewFile] = useState(null);

  const loadFiles = async (folderPath = activeTab) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetchMediaAssets({ path: folderPath, limit: 100 });
      if (res && res.data) {
        setFiles(res.data);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch files from ImageKit CDN");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFiles(activeTab);
    // Keep upload folder in sync with active tab if it's a specific folder
    if (activeTab !== "all") {
      setUploadFolder(activeTab);
    }
  }, [activeTab]);

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      if (!customFileName) {
        setCustomFileName(file.name);
      }
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    try {
      setUploading(true);
      setError("");
      setSuccessMsg("");

      const finalName = customFileName.trim() || selectedFile.name;
      const targetFolder = uploadFolder || "/suchamojo/uploads";
      const tagsArray = uploadTags
        ? uploadTags.split(",").map((t) => t.trim()).filter(Boolean)
        : ["suchamojo", targetFolder.split("/").pop()];

      // Read file as base64
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Data = reader.result;
          await uploadMediaAsset({
            file: base64Data,
            fileName: finalName,
            folder: targetFolder,
            tags: tagsArray,
          });

          setSuccessMsg(`"${finalName}" successfully uploaded to ImageKit (${targetFolder})!`);
          setSelectedFile(null);
          setCustomFileName("");
          setUploadTags("");
          if (fileInputRef.current) fileInputRef.current.value = "";
          loadFiles(activeTab);
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
    if (!window.confirm(`Are you sure you want to permanently delete "${fileName}" from ImageKit CDN?`)) {
      return;
    }
    try {
      setError("");
      await deleteMediaAsset(fileId);
      setSuccessMsg(`Deleted "${fileName}" successfully from ImageKit`);
      setFiles((prev) => prev.filter((f) => f.fileId !== fileId));
      if (previewFile?.fileId === fileId) setPreviewFile(null);
      if (editingFile?.fileId === fileId) setEditingFile(null);
    } catch (err) {
      setError(err.message || "Failed to delete file");
    }
  };

  const openEditModal = (file) => {
    setEditingFile(file);
    setEditFileName(file.name || "");
    setEditTags(Array.isArray(file.tags) ? file.tags.join(", ") : "");
    setEditTab("replace");
    setReplacementFile(null);
    setReplacementPreview("");
    setKeepSameFileName(true);
  };

  const handleReplacementFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReplacementFile(file);
      setReplacementPreview(URL.createObjectURL(file));
    }
  };

  const handleExecuteReplace = async (e) => {
    e.preventDefault();
    if (!editingFile || !replacementFile) return;

    try {
      setReplacing(true);
      setError("");
      setSuccessMsg("");

      // Derive folder from editingFile.filePath (e.g. "/suchamojo/hero/image.png" -> "/suchamojo/hero")
      const pathParts = (editingFile.filePath || "").split("/").filter(Boolean);
      pathParts.pop(); // remove fileName
      const targetFolder = "/" + pathParts.join("/");

      // Target filename: keep existing or use new file name
      const targetFileName = keepSameFileName ? editingFile.name : replacementFile.name;

      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Data = reader.result;
          await uploadMediaAsset({
            file: base64Data,
            fileName: targetFileName,
            folder: targetFolder || "/suchamojo/uploads",
            tags: Array.isArray(editingFile.tags) ? editingFile.tags : ["suchamojo"],
            useUniqueFileName: false,
            overwriteFile: true,
            oldFileId: editingFile.fileId,
          });

          setSuccessMsg(`Image "${targetFileName}" replaced successfully in ImageKit CDN!`);
          setEditingFile(null);
          setReplacementFile(null);
          setReplacementPreview("");
          loadFiles(activeTab);
        } catch (uploadErr) {
          setError(uploadErr.message || "Failed to replace image in ImageKit");
        } finally {
          setReplacing(false);
        }
      };
      reader.onerror = () => {
        setError("Error reading replacement file");
        setReplacing(false);
      };
      reader.readAsDataURL(replacementFile);
    } catch (err) {
      setError(err.message || "Replace failed");
      setReplacing(false);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingFile) return;

    try {
      setActionLoading(true);
      setError("");

      const hasNameChanged = editFileName.trim() && editFileName.trim() !== editingFile.name;
      const tagsArray = editTags.split(",").map((t) => t.trim()).filter(Boolean);

      // 1. Rename if name changed
      if (hasNameChanged) {
        await renameMediaAsset({
          filePath: editingFile.filePath,
          newFileName: editFileName.trim(),
        });
      }

      // 2. Update tags
      await updateMediaAssetDetails(editingFile.fileId, { tags: tagsArray });

      setSuccessMsg(`Asset "${editFileName.trim()}" updated successfully!`);
      setEditingFile(null);
      loadFiles(activeTab);
    } catch (err) {
      setError(err.message || "Failed to update asset details");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredFiles = files.filter((f) => {
    const matchName = (f.name || "").toLowerCase().includes(search.toLowerCase());
    const matchTag = Array.isArray(f.tags) && f.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchName || matchTag;
  });

  const formatBytes = (bytes) => {
    if (!bytes || bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const currentTabInfo = PAGE_FOLDERS.find((p) => p.path === activeTab) || PAGE_FOLDERS[0];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">
            Media Library (ImageKit CDN)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Organized page-by-page. Upload, preview, rename, and delete assets in real-time sync with ImageKit.
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

      {/* Page Folder Tabs */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          Page-Wise Folders
        </div>

        <div className="flex flex-wrap gap-2">
          {PAGE_FOLDERS.map((folder) => {
            const isActive = activeTab === folder.path;
            return (
              <button
                key={folder.id}
                onClick={() => setActiveTab(folder.path)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition ${
                  isActive
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                {folder.label}
              </button>
            );
          })}
        </div>

        <p className="mt-3 text-[11px] text-slate-400 italic">
          Viewing: <span className="text-orange-400 font-mono font-normal">{currentTabInfo.path}</span> — {currentTabInfo.desc}
        </p>
      </div>

      {/* Upload Box */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-orange-400 mb-3">
          Upload Asset to {uploadFolder}
        </h2>

        <form onSubmit={handleUpload} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* File Input */}
            <div className="md:col-span-5">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="w-full text-xs text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600 cursor-pointer"
              />
            </div>

            {/* Folder Destination Selector */}
            <div className="md:col-span-4">
              <select
                value={uploadFolder}
                onChange={(e) => setUploadFolder(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-xs text-white outline-none focus:border-orange-500"
              >
                {PAGE_FOLDERS.filter((p) => p.path !== "all").map((p) => (
                  <option key={p.id} value={p.path}>
                    {p.label} ({p.path})
                  </option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <div className="md:col-span-3">
              <button
                type="submit"
                disabled={!selectedFile || uploading}
                className="w-full px-5 py-2.5 rounded-xl bg-orange-500 text-white text-xs font-bold uppercase tracking-wider hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {uploading ? "Uploading to CDN..." : "Upload File"}
              </button>
            </div>
          </div>

          {selectedFile && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <input
                  type="text"
                  placeholder="Custom filename (optional)"
                  value={customFileName}
                  onChange={(e) => setCustomFileName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Tags (comma separated, e.g. banner, hero)"
                  value={uploadTags}
                  onChange={(e) => setUploadTags(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500"
                />
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-400">
          Showing <span className="font-bold text-white">{filteredFiles.length}</span> assets
        </div>

        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search assets by name or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 text-xs">
          Loading assets from ImageKit CDN...
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 py-20 text-center text-slate-500 text-xs">
          No files found in {activeTab}. Use the upload box above to add assets.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredFiles.map((file) => {
            const isCopied = copiedId === file.fileId;
            const optimizedThumb = file.fileType === "image"
              ? getImageKitUrl(file.filePath, { width: 350, quality: 80 })
              : file.thumbnail || file.url;

            return (
              <div
                key={file.fileId}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2.5 transition hover:border-orange-500/50 hover:bg-white/10"
              >
                {/* Image Preview Thumbnail */}
                <div
                  onClick={() => setPreviewFile(file)}
                  className="relative aspect-video sm:aspect-square w-full overflow-hidden rounded-xl bg-black/40 cursor-pointer"
                >
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
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>{formatBytes(file.size)}</span>
                    <span className="truncate max-w-[80px] font-mono text-[9px] text-slate-500">
                      {file.filePath.split("/").slice(0, -1).join("/")}
                    </span>
                  </div>
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
                    onClick={() => openEditModal(file)}
                    className="rounded-lg bg-white/10 p-1.5 text-slate-300 hover:bg-white/20 hover:text-white transition"
                    title="Edit / Rename"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>

                  <button
                    onClick={() => handleDelete(file.fileId, file.name)}
                    className="rounded-lg bg-red-500/10 p-1.5 text-red-400 hover:bg-red-500 hover:text-white transition"
                    title="Delete from ImageKit"
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

      {/* Edit / Rename / Replace Modal */}
      {editingFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="w-full max-w-xl rounded-2xl border border-white/20 bg-[#121216] p-6 shadow-2xl space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Edit Asset / Replace Image
                </h3>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5 truncate max-w-sm">
                  {editingFile.filePath}
                </p>
              </div>
              <button
                onClick={() => setEditingFile(null)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            {/* Current Asset Overview Card */}
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/50 p-3">
              <div className="h-14 w-14 rounded-lg bg-black/60 overflow-hidden shrink-0 border border-white/10">
                <img
                  src={editingFile.thumbnail || editingFile.url}
                  alt={editingFile.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1 text-xs">
                <p className="font-semibold text-white truncate" title={editingFile.name}>
                  {editingFile.name}
                </p>
                <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-1">
                  <span>{editingFile.width && editingFile.height ? `${editingFile.width}×${editingFile.height}` : editingFile.fileType}</span>
                  <span>{formatBytes(editingFile.size)}</span>
                  <span className="font-mono text-slate-500">{editingFile.filePath}</span>
                </div>
              </div>
            </div>

            {/* Tab Switcher */}
            <div className="flex rounded-xl border border-white/10 bg-black/40 p-1 text-xs">
              <button
                type="button"
                onClick={() => setEditTab("replace")}
                className={`flex-1 py-1.5 rounded-lg font-bold uppercase tracking-wider transition ${
                  editTab === "replace"
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                🔄 Replace Image File
              </button>
              <button
                type="button"
                onClick={() => setEditTab("details")}
                className={`flex-1 py-1.5 rounded-lg font-bold uppercase tracking-wider transition ${
                  editTab === "details"
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                ✏ Rename & Tags
              </button>
            </div>

            {/* Tab 1: Replace Image */}
            {editTab === "replace" ? (
              <form onSubmit={handleExecuteReplace} className="space-y-4">
                <div
                  className="rounded-xl border-2 border-dashed border-white/20 hover:border-orange-500/60 bg-black/40 p-5 text-center transition cursor-pointer"
                  onClick={() => replaceInputRef.current?.click()}
                >
                  <input
                    ref={replaceInputRef}
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleReplacementFileChange}
                    className="hidden"
                  />

                  {replacementPreview ? (
                    <div className="space-y-2">
                      <span className="inline-block rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                        ✓ Replacement File Selected
                      </span>
                      <div className="mx-auto h-32 w-52 overflow-hidden rounded-xl border border-emerald-500/40 bg-black shadow-lg">
                        <img
                          src={replacementPreview}
                          alt="Replacement Preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <p className="text-xs text-white font-semibold">{replacementFile.name}</p>
                      <p className="text-[10px] text-slate-400">{formatBytes(replacementFile.size)}</p>
                      <span className="text-[11px] text-orange-400 hover:underline inline-block mt-1">
                        Click here to select a different file
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-2 py-4">
                      <svg className="mx-auto h-8 w-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <p className="text-xs font-bold text-white">Click or drag & drop to choose replacement image</p>
                      <p className="text-[10px] text-slate-400">PNG, JPG, WEBP, SVG or GIF</p>
                    </div>
                  )}
                </div>

                {replacementFile && (
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3 space-y-1.5 text-xs">
                    <label className="flex items-start gap-2.5 text-slate-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={keepSameFileName}
                        onChange={(e) => setKeepSameFileName(e.target.checked)}
                        className="mt-0.5 rounded border-white/30 text-orange-500 focus:ring-0"
                      />
                      <div>
                        <span className="font-semibold text-white">
                          Keep current filename ({editingFile.name})
                        </span>
                        <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">
                          Recommended: Overwrites this exact slot in ImageKit so all website pages, hero sections, and blogs using this image automatically update without breaking.
                        </p>
                      </div>
                    </label>
                  </div>
                )}

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingFile(null)}
                    className="rounded-xl px-4 py-2 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={!replacementFile || replacing}
                    className="rounded-xl bg-orange-500 hover:bg-orange-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/20"
                  >
                    {replacing ? "Uploading Replacement to ImageKit CDN..." : "Upload & Replace Image"}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    File Name
                  </label>
                  <input
                    type="text"
                    value={editFileName}
                    onChange={(e) => setEditFileName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2 text-xs text-white outline-none focus:border-orange-500 font-mono"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    Path: {editingFile.filePath}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={editTags}
                    onChange={(e) => setEditTags(e.target.value)}
                    placeholder="e.g. hero, background, mobile"
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2 text-xs text-white outline-none focus:border-orange-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingFile(null)}
                    className="rounded-xl px-4 py-2 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="rounded-xl bg-orange-500 hover:bg-orange-600 px-5 py-2 text-xs font-bold uppercase text-white transition disabled:opacity-50"
                  >
                    {actionLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewFile && (
        <div
          onClick={() => setPreviewFile(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl rounded-2xl border border-white/20 bg-[#121216] p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white truncate max-w-md">
                {previewFile.name}
              </h3>
              <button
                onClick={() => setPreviewFile(null)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="flex items-center justify-center bg-black/60 rounded-xl overflow-hidden max-h-[60vh]">
              <img
                src={previewFile.url}
                alt={previewFile.name}
                className="max-h-[60vh] w-auto object-contain"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-300 border-t border-white/10 pt-3">
              <div>
                <span className="text-slate-500 block">Dimensions:</span>
                <span className="font-mono">{previewFile.width ? `${previewFile.width}×${previewFile.height}` : "N/A"}</span>
              </div>
              <div>
                <span className="text-slate-500 block">File Size:</span>
                <span className="font-mono">{formatBytes(previewFile.size)}</span>
              </div>
              <div>
                <span className="text-slate-500 block">MIME Type:</span>
                <span className="font-mono">{previewFile.mime || previewFile.fileType}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Folder:</span>
                <span className="font-mono truncate block">{previewFile.filePath}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href={previewFile.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-orange-400 hover:underline"
              >
                Open Original in New Tab ↗
              </a>

              <button
                onClick={() => handleCopy(previewFile.url, previewFile.fileId)}
                className="rounded-xl bg-orange-500 hover:bg-orange-600 px-4 py-2 text-xs font-bold uppercase text-white"
              >
                {copiedId === previewFile.fileId ? "Copied URL!" : "Copy CDN URL"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaManager;
