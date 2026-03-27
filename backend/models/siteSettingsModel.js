const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: 'default',
      unique: true,
      trim: true,
    },
    cta: {
      enabled: {
        type: Boolean,
        default: true,
      },
      label: {
        type: String,
        default: 'Book Your Free Call',
        trim: true,
      },
      body: {
        type: String,
        default: 'Start with a free 30-minute strategy call. No sales pitch. Just clarity.',
        trim: true,
      },
      link: {
        type: String,
        default: '/book-a-call',
        trim: true,
      },
    },
    calendar: {
      defaultUrl: {
        type: String,
        default: '',
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
