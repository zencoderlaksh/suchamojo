export const API_BASE_URL = (() => {
  const envBase = import.meta.env.VITE_API_BASE_URL;
  if (typeof window !== "undefined") {
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    // In production, fallback to Render backend if env var is missing or points to localhost
    if (!isLocalhost && (!envBase || envBase.includes("localhost"))) {
      return "https://suchamojo.onrender.com";
    }
  }
  return envBase || "https://suchamojo.onrender.com";
})();
const REQUEST_TIMEOUT_MS = 15000;

const fetchWithTimeout = async (url, options = {}) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, {
      ...options,
      credentials: "include",
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
};

export const postConsultationLead = async (payload) => {
  const response = await fetchWithTimeout(
    `${API_BASE_URL}/api/leads/consultation`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    const message =
      data?.errors?.join(", ") ||
      data?.message ||
      "Failed to submit consultation request";
    throw new Error(message);
  }

  return data;
};

const fetchJson = async (url) => {
  const response = await fetchWithTimeout(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
};

export const fetchBlogs = async ({ tag } = {}) => {
  const query = tag ? `?tag=${encodeURIComponent(tag)}` : "";
  return fetchJson(`${API_BASE_URL}/api/blogs${query}`);
};

export const fetchBlogBySlug = async (slug) => {
  return fetchJson(`${API_BASE_URL}/api/blogs/${encodeURIComponent(slug)}`);
};

export const fetchPageSeo = async (slug) => {
  return fetchJson(`${API_BASE_URL}/api/seo/${encodeURIComponent(slug)}`);
};

export const fetchPublicSettings = async () => {
  return fetchJson(`${API_BASE_URL}/api/settings`);
};

export const fetchTestimonials = async () => {
  return fetchJson(`${API_BASE_URL}/api/testimonials`);
};

export const fetchAdminTestimonials = async () => {
  return fetchJson(`${API_BASE_URL}/api/testimonials?includeDrafts=true`);
};

export const fetchAdminSettings = async (adminKey) => {
  const headers = authHeaders();
  if (adminKey) headers["x-admin-key"] = adminKey;
  const response = await fetchWithTimeout(
    `${API_BASE_URL}/api/settings/admin`,
    { headers },
  );
  const data = await response.json();
  if (!response.ok)
    throw new Error(data?.message || "Failed to load admin settings");
  return data;
};

export const updateAdminSettings = async (adminKeyOrPayload, maybePayload) => {
  const payload = maybePayload !== undefined ? maybePayload : adminKeyOrPayload;
  const adminKey = maybePayload !== undefined ? adminKeyOrPayload : null;
  const headers = authHeaders(true);
  if (adminKey) headers["x-admin-key"] = adminKey;

  const response = await fetchWithTimeout(
    `${API_BASE_URL}/api/settings/admin`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(payload),
    },
  );
  const data = await response.json();
  if (!response.ok)
    throw new Error(data?.message || "Failed to update settings");
  return data;
};

const authHeaders = (contentType = false) => {
  const token = localStorage.getItem("adminToken");
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (contentType) headers["Content-Type"] = "application/json";
  return headers;
};

export const fetchAdminLeads = async () => {
  const response = await fetchWithTimeout(
    `${API_BASE_URL}/api/leads/consultation`,
    { headers: authHeaders() },
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data?.message || "Request failed");
  return data;
};

export const deleteAdminLead = async (id) => {
  const response = await fetchWithTimeout(
    `${API_BASE_URL}/api/leads/consultation/${id}`,
    {
      method: "DELETE",
      headers: authHeaders(),
    },
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data?.message || "Failed to delete lead");
  return data;
};

export const fetchAdminSeoPages = async () => {
  const response = await fetchWithTimeout(
    `${API_BASE_URL}/api/seo?includeDrafts=true`,
    { headers: authHeaders() },
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data?.message || "Failed to fetch SEO pages");
  return data;
};

export const upsertPageSeo = async (slug, payload) => {
  const response = await fetchWithTimeout(
    `${API_BASE_URL}/api/seo/${encodeURIComponent(slug)}`,
    {
      method: "PUT",
      headers: authHeaders(true),
      body: JSON.stringify(payload),
    },
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data?.message || "Failed to save SEO");
  return data;
};

export const deletePageSeo = async (slug) => {
  const response = await fetchWithTimeout(
    `${API_BASE_URL}/api/seo/${encodeURIComponent(slug)}`,
    {
      method: "DELETE",
      headers: authHeaders(),
    },
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data?.message || "Failed to delete SEO");
  return data;
};

export const fetchAdminBlogs = async () => {
  const response = await fetchWithTimeout(
    `${API_BASE_URL}/api/blogs?includeDrafts=true`,
    { headers: authHeaders() },
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data?.message || "Request failed");
  return data;
};

export const createBlogPost = async (payload) => {
  const response = await fetchWithTimeout(`${API_BASE_URL}/api/blogs`, {
    method: "POST",
    headers: authHeaders(true),
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.message || "Failed to create blog");
  return data;
};

export const updateBlogPost = async (id, payload) => {
  const response = await fetchWithTimeout(`${API_BASE_URL}/api/blogs/${id}`, {
    method: "PUT",
    headers: authHeaders(true),
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.message || "Failed to update blog");
  return data;
};

export const deleteBlogPost = async (id) => {
  const response = await fetchWithTimeout(`${API_BASE_URL}/api/blogs/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.message || "Failed to delete blog");
  return data;
};

export const publishBlog = async (id) => {
  const response = await fetchWithTimeout(`${API_BASE_URL}/api/blogs/${id}`, {
    method: "PUT",
    headers: authHeaders(true),
    body: JSON.stringify({ status: "published" }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.message || "Failed to publish blog");
  return data;
};

export const createTestimonial = async (payload) => {
  const token = localStorage.getItem("adminToken");
  const response = await fetchWithTimeout(`${API_BASE_URL}/api/testimonials`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data?.message || "Failed to create testimonial");
  return data;
};

export const updateTestimonial = async (id, payload) => {
  const token = localStorage.getItem("adminToken");
  const response = await fetchWithTimeout(
    `${API_BASE_URL}/api/testimonials/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    },
  );
  const data = await response.json();
  if (!response.ok)
    throw new Error(data?.message || "Failed to update testimonial");
  return data;
};

export const deleteTestimonial = async (id) => {
  const token = localStorage.getItem("adminToken");
  const response = await fetchWithTimeout(
    `${API_BASE_URL}/api/testimonials/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await response.json();
  if (!response.ok)
    throw new Error(data?.message || "Failed to delete testimonial");
  return data;
};

export const fetchMediaAssets = async ({ path = "/suchamojo", limit = 50 } = {}) => {
  const query = `?path=${encodeURIComponent(path)}&limit=${limit}`;
  return fetchJson(`${API_BASE_URL}/api/media/list${query}`);
};

export const uploadMediaAsset = async ({
  file,
  fileName,
  folder = "/suchamojo/uploads",
  tags = [],
  useUniqueFileName = false,
  overwriteFile = true,
  oldFileId,
}) => {
  const response = await fetchWithTimeout(`${API_BASE_URL}/api/media/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      file,
      fileName,
      folder,
      tags,
      useUniqueFileName,
      overwriteFile,
      oldFileId,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "Failed to upload asset to ImageKit");
  }
  return data;
};

export const deleteMediaAsset = async (fileId) => {
  const response = await fetchWithTimeout(`${API_BASE_URL}/api/media/${fileId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "Failed to delete asset from ImageKit");
  }
  return data;
};

export const renameMediaAsset = async ({ filePath, newFileName }) => {
  const response = await fetchWithTimeout(`${API_BASE_URL}/api/media/rename`, {
    method: "POST",
    headers: authHeaders(true),
    body: JSON.stringify({ filePath, newFileName }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "Failed to rename asset in ImageKit");
  }
  return data;
};

export const updateMediaAssetDetails = async (fileId, payload) => {
  const response = await fetchWithTimeout(`${API_BASE_URL}/api/media/${fileId}`, {
    method: "PATCH",
    headers: authHeaders(true),
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "Failed to update asset details in ImageKit");
  }
  return data;
};

