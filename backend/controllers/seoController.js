const PageSeo = require('../models/pageSeoModel');

const listSeoPages = async (req, res, next) => {
  try {
    const includeDrafts = req.query.includeDrafts === 'true';
    const query = includeDrafts ? {} : { status: 'published' };
    const items = await PageSeo.find(query).sort({ updatedAt: -1 });
    return res.status(200).json(items);
  } catch (error) {
    return next(error);
  }
};

const getSeoBySlug = async (req, res, next) => {
  try {
    const includeDrafts = req.query.includeDrafts === 'true';
    const query = { slug: req.params.slug };
    if (!includeDrafts) query.status = 'published';
    const item = await PageSeo.findOne(query);
    if (!item) return res.status(404).json({ message: 'SEO page not found' });
    res.set('Cache-Control', includeDrafts ? 'no-store' : 'public, max-age=300');
    return res.status(200).json(item);
  } catch (error) {
    return next(error);
  }
};

const upsertSeoBySlug = async (req, res, next) => {
  try {
    const slug = String(req.params.slug || '').toLowerCase().trim();
    if (!slug) return res.status(400).json({ message: 'slug is required' });

    const payload = {
      slug,
      metaTitle: req.body.metaTitle,
      metaDescription: req.body.metaDescription,
      canonicalUrl: req.body.canonicalUrl || '',
      ogImage: req.body.ogImage || '',
      ogTitle: req.body.ogTitle || req.body.metaTitle || '',
      ogDescription: req.body.ogDescription || req.body.metaDescription || '',
      status: req.body.status === 'draft' ? 'draft' : 'published',
    };

    if (!payload.metaTitle || !payload.metaDescription) {
      return res.status(400).json({ message: 'metaTitle and metaDescription are required' });
    }

    const item = await PageSeo.findOneAndUpdate({ slug }, payload, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });

    return res.status(200).json(item);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  listSeoPages,
  getSeoBySlug,
  upsertSeoBySlug,
};
