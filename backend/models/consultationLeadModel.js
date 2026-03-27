const mongoose = require('mongoose');

const consultationLeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      default: '',
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    sourcePage: {
      type: String,
      required: true,
      trim: true,
    },
    serviceInterest: {
      type: String,
      required: true,
      trim: true,
    },
    audience: {
      type: String,
      default: '',
      trim: true,
    },
    offer: {
      type: String,
      default: '',
      trim: true,
    },
    sebiRegistered: {
      type: Boolean,
      default: null,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    deviceType: {
      type: String,
      enum: ['desktop', 'mobile', 'tablet', 'unknown'],
      default: 'unknown',
    },
    qualificationTier: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium',
    },
    pageTag: {
      type: String,
      default: 'general',
      trim: true,
    },
    quickSummary: {
      type: String,
      default: '',
      trim: true,
    },
    calendar: {
      provider: {
        type: String,
        default: 'calendly',
      },
      timezone: {
        type: String,
        default: 'Asia/Kolkata',
      },
      redirectToCalendar: {
        type: Boolean,
        default: true,
      },
      redirectUrl: {
        type: String,
        default: '',
      },
      reason: {
        type: String,
        default: 'eligible',
      },
    },
    notes: {
      type: String,
      default: '',
      trim: true,
    },
    integrationStatus: {
      notion: {
        type: String,
        enum: ['pending', 'sent', 'failed', 'disabled'],
        default: 'disabled',
      },
      googleSheets: {
        type: String,
        enum: ['pending', 'sent', 'failed', 'disabled'],
        default: 'disabled',
      },
      crm: {
        type: String,
        enum: ['pending', 'sent', 'failed', 'disabled'],
        default: 'disabled',
      },
    },
    emailStatus: {
      user: {
        type: String,
        enum: ['pending', 'sent', 'failed', 'disabled'],
        default: 'disabled',
      },
      owner: {
        type: String,
        enum: ['pending', 'sent', 'failed', 'disabled'],
        default: 'disabled',
      },
    },
  },
  {
    timestamps: true,
  },
);

consultationLeadSchema.index({ submittedAt: -1, 'calendar.redirectToCalendar': 1 });
consultationLeadSchema.index({ sourcePage: 1, submittedAt: -1 });

module.exports = mongoose.model('ConsultationLead', consultationLeadSchema);
