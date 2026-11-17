const SiteSettings = require('../models/siteSettingsModel');

const DEFAULT_SETTINGS = {
  key: 'default',
  cta: {
    enabled: true,
    label: 'Book Your Free Call',
    body: 'Start with a free 30-minute strategy call. No sales pitch. Just clarity.',
    link: '/book-a-call',
  },
  calendar: {
    defaultUrl: '',
  },
  social: {
    linkedin: 'https://www.linkedin.com/in/suchamojo/',
    instagram: 'https://www.instagram.com/suchamojo/?hl=en',
    youtube: 'https://www.youtube.com/@suchamojo',
    x: 'https://x.com/suchamojo_',
  },
};

const getOrCreateSettings = async () => {
  let settings = await SiteSettings.findOne({ key: 'default' });
  if (!settings) {
    settings = await SiteSettings.create(DEFAULT_SETTINGS);
  } else if (!settings.social || !settings.social.linkedin) {
    settings.social = {
      linkedin: settings.social?.linkedin || DEFAULT_SETTINGS.social.linkedin,
      instagram: settings.social?.instagram || DEFAULT_SETTINGS.social.instagram,
      youtube: settings.social?.youtube || DEFAULT_SETTINGS.social.youtube,
      x: settings.social?.x || DEFAULT_SETTINGS.social.x,
    };
    await settings.save();
  }
  return settings;
};

const getPublicSettings = async (req, res, next) => {
  try {
    const settings = await getOrCreateSettings();
    res.set('Cache-Control', 'public, max-age=60');
    return res.status(200).json({
      cta: settings.cta,
      calendar: settings.calendar,
      social: settings.social || DEFAULT_SETTINGS.social,
    });
  } catch (error) {
    return next(error);
  }
};

const getAdminSettings = async (req, res, next) => {
  try {
    const settings = await getOrCreateSettings();
    return res.status(200).json(settings);
  } catch (error) {
    return next(error);
  }
};

const updateAdminSettings = async (req, res, next) => {
  try {
    const settings = await getOrCreateSettings();
    const { cta = {}, calendar = {}, social = {} } = req.body || {};

    settings.cta = {
      ...settings.cta.toObject(),
      ...cta,
    };
    settings.calendar = {
      ...settings.calendar.toObject(),
      ...calendar,
    };
    settings.social = {
      ...(settings.social ? settings.social.toObject() : DEFAULT_SETTINGS.social),
      ...social,
    };

    await settings.save();
    return res.status(200).json(settings);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getPublicSettings,
  getAdminSettings,
  updateAdminSettings,
};
