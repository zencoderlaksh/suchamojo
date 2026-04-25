const BlogPost = require("../models/blogPostModel");
const { slugify } = require("../utils/slugify");

const normalizeTags = (tags = []) => {
  if (!Array.isArray(tags)) return [];
  return tags.map((tag) => String(tag).trim()).filter(Boolean);
};

const createBlog = async (req, res, next) => {
  try {
    const {
      title,
      excerpt,
      content,
      coverImage,
      heroImage,
      tags,
      status,
      slug,
      author,
      publishDate,
      metaTitle,
      metaDescription,
      canonicalUrl,
      ogImage,
      ogTitle,
      ogDescription,
    } = req.body;

    if (!title || !excerpt || !content) {
      return res
        .status(400)
        .json({ message: "title, excerpt and content are required" });
    }

    const finalSlug = slugify(slug || title);
    const publishedAt =
      status === "published" ?
        publishDate ? new Date(publishDate)
        : new Date()
      : null;

    const blog = await BlogPost.create({
      title,
      slug: finalSlug,
      author: author || "Suchamojo",
      excerpt,
      content,
      coverImage: coverImage || "",
      heroImage: heroImage || coverImage || "",
      tags: normalizeTags(tags),
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt,
      canonicalUrl: canonicalUrl || "",
      ogImage: ogImage || heroImage || coverImage || "",
      ogTitle: ogTitle || metaTitle || title,
      ogDescription: ogDescription || metaDescription || excerpt,
      status: status === "published" ? "published" : "draft",
      publishedAt,
    });

    return res.status(201).json(blog);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "A blog with this slug already exists" });
    }
    return next(error);
  }
};

const listBlogs = async (req, res, next) => {
  try {
    const includeDrafts = req.query.includeDrafts === "true";
    if (includeDrafts && (!req.user || req.user.role !== "admin")) {
      return res
        .status(403)
        .json({ message: "Admin access required for drafts" });
    }
    const tag = req.query.tag ? String(req.query.tag).trim() : "";
    const limit = Math.min(Math.max(Number(req.query.limit || 50), 1), 100);
    const query = includeDrafts ? {} : { status: "published" };
    if (tag) {
      query.tags = { $in: [tag] };
    }

    const blogs = await BlogPost.find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(limit)
      .select(
        "title slug author excerpt heroImage coverImage tags publishedAt metaTitle metaDescription canonicalUrl ogImage ogTitle ogDescription status",
      )
      .lean();
    res.set("Cache-Control", includeDrafts ? "no-store" : "public, max-age=60");
    return res.status(200).json(blogs);
  } catch (error) {
    return next(error);
  }
};

const getBlogBySlug = async (req, res, next) => {
  try {
    const includeDrafts = req.query.includeDrafts === "true";
    const query = { slug: req.params.slug };
    if (!includeDrafts) {
      query.status = "published";
    }

    const blog = await BlogPost.findOne(query).lean();
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json(blog);
  } catch (error) {
    return next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const fields = [
      "title",
      "author",
      "excerpt",
      "content",
      "coverImage",
      "heroImage",
      "metaTitle",
      "metaDescription",
      "canonicalUrl",
      "ogImage",
      "ogTitle",
      "ogDescription",
    ];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) blog[field] = req.body[field];
    });
    if (req.body.tags !== undefined) blog.tags = normalizeTags(req.body.tags);

    if (req.body.slug !== undefined || req.body.title !== undefined) {
      blog.slug = slugify(req.body.slug || blog.title);
    }

    if (req.body.status !== undefined) {
      blog.status = req.body.status === "published" ? "published" : "draft";
      if (blog.status === "published") {
        blog.publishedAt =
          req.body.publishDate ?
            new Date(req.body.publishDate)
          : blog.publishedAt || new Date();
      } else {
        blog.publishedAt = null;
      }
    }

    await blog.save();
    return res.status(200).json(blog);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "A blog with this slug already exists" });
    }
    return next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await blog.deleteOne();
    return res.status(200).json({ message: "Blog deleted" });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createBlog,
  listBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
};
