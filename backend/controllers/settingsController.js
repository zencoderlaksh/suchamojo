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
};

const getOrCreateSettings = async () => {
  let settings = await SiteSettings.findOne({ key: 'default' });
  if (!settings) {
    settings = await SiteSettings.create(DEFAULT_SETTINGS);
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
    const { cta = {}, calendar = {} } = req.body || {};

    settings.cta = {
      ...settings.cta.toObject(),
      ...cta,
    };
    settings.calendar = {
      ...settings.calendar.toObject(),
      ...calendar,
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
