const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const REQUEST_TIMEOUT_MS = 12000;

const fetchWithTimeout = async (url, options = {}) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, { ...options, signal: controller.signal });
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
  const response = await fetchWithTimeout(
    `${API_BASE_URL}/api/settings/admin`,
    {
      headers: { "x-admin-key": adminKey },
    },
  );
  const data = await response.json();
  if (!response.ok)
    throw new Error(data?.message || "Failed to load admin settings");
  return data;
};

export const updateAdminSettings = async (adminKey, payload) => {
  const response = await fetchWithTimeout(
    `${API_BASE_URL}/api/settings/admin`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey,
      },
      body: JSON.stringify(payload),
    },
  );
  const data = await response.json();
  if (!response.ok)
    throw new Error(data?.message || "Failed to update settings");
  return data;
};

export const createBlogPost = async (adminKey, payload) => {
  const response = await fetchWithTimeout(`${API_BASE_URL}/api/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-key": adminKey,
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.message || "Failed to create blog");
  return data;
};

export const fetchAdminLeads = async () => {
  return fetchJson(`${API_BASE_URL}/api/leads/consultation`);
};

export const fetchAdminBlogs = async () => {
  return fetchJson(`${API_BASE_URL}/api/blogs?includeDrafts=true`);
};

export const publishBlog = async (id, adminKey) => {
  const response = await fetchWithTimeout(`${API_BASE_URL}/api/blogs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-admin-key": adminKey,
    },
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
