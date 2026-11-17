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
    social: {
      linkedin: {
        type: String,
        default: 'https://www.linkedin.com/in/suchamojo/',
        trim: true,
      },
      instagram: {
        type: String,
        default: 'https://www.instagram.com/suchamojo/?hl=en',
        trim: true,
      },
      youtube: {
        type: String,
        default: 'https://www.youtube.com/@suchamojo',
        trim: true,
      },
      x: {
        type: String,
        default: 'https://x.com/suchamojo_',
        trim: true,
      },
    },
    whatsapp: {
      enabled: {
        type: Boolean,
        default: true,
      },
      phoneNumber: {
        type: String,
        default: '8851258630',
        trim: true,
      },
      defaultMessage: {
        type: String,
        default: 'Hi Shubham, I would like to enquire about your content & personal branding services.',
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
