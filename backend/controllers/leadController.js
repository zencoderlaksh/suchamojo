const ConsultationLead = require("../models/consultationLeadModel");
const { dispatchLeadIntegrations } = require("../services/leadIntegrations");
const {
  detectDeviceType,
  getQualificationTier,
  normalizeWhitespace,
} = require("../utils/leadUtils");
const { getPageTag, buildQuickSummary } = require("../utils/leadMetadata");
const { evaluateCalendarDecision } = require("../services/calendarRouting");
const { sendLeadEmails } = require("../services/leadEmails");

const normalizeLeadPayload = (body, userAgent) => {
  const name = normalizeWhitespace(body.name);
  const email = normalizeWhitespace(body.email).toLowerCase();
  const phone = normalizeWhitespace(body.phone || "");
  const category = normalizeWhitespace(body.category);
  const sourcePage = normalizeWhitespace(body.sourcePage || "unknown");
  const serviceInterest = normalizeWhitespace(body.serviceInterest || category);
  const audience = normalizeWhitespace(body.audience || "");
  const offer = normalizeWhitespace(body.offer || "");
  const sebiRegistered =
    (
      body.sebiRegistered === true ||
      body.sebiRegistered === "true" ||
      body.sebiRegistered === "yes"
    ) ?
      true
    : body.sebiRegistered === false || body.sebiRegistered === "false" ? false
    : null;
  const submittedAt = body.timestamp ? new Date(body.timestamp) : new Date();
  const deviceType = body.deviceType || detectDeviceType(userAgent);
  const qualificationTier = getQualificationTier(serviceInterest, category);

  return {
    name,
    email,
    phone,
    category,
    sourcePage,
    serviceInterest,
    audience,
    offer,
    sebiRegistered,
    submittedAt,
    deviceType,
    qualificationTier,
  };
};

const validateLeadPayload = (payload) => {
  const errors = [];

  if (!payload.name) errors.push("name is required");
  if (!payload.email) errors.push("email is required");
  if (!payload.category) errors.push("category is required");
  if (!payload.sourcePage) errors.push("sourcePage is required");
  if (!payload.serviceInterest) errors.push("serviceInterest is required");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (payload.email && !emailRegex.test(payload.email)) {
    errors.push("email is invalid");
  }

  if (Number.isNaN(payload.submittedAt.getTime())) {
    errors.push("timestamp is invalid");
  }

  return errors;
};

const submitConsultationLead = async (req, res, next) => {
  try {
    const leadPayload = normalizeLeadPayload(
      req.body,
      req.headers["user-agent"],
    );
    const errors = validateLeadPayload(leadPayload);

    if (errors.length) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const pageTag = getPageTag(leadPayload.sourcePage);
    const calendar = await evaluateCalendarDecision({
      serviceInterest: leadPayload.serviceInterest,
      pageTag,
    });
    const quickSummary = buildQuickSummary({ ...leadPayload, pageTag });

    const lead = await ConsultationLead.create({
      ...leadPayload,
      pageTag,
      quickSummary,
      calendar,
      integrationStatus: {
        notion:
          process.env.NOTION_API_KEY || process.env.NOTION_WEBHOOK_URL ?
            "pending"
          : "disabled",
        googleSheets:
          process.env.GOOGLE_SHEETS_WEBHOOK_URL ? "pending" : "disabled",
        crm: process.env.CRM_WEBHOOK_URL ? "pending" : "disabled",
      },
      emailStatus: {
        user:
          process.env.SMTP_HOST || process.env.RESEND_API_KEY ?
            "pending"
          : "disabled",
        owner:
          (
            (process.env.SMTP_HOST || process.env.RESEND_API_KEY) &&
            process.env.INTERNAL_NOTIFICATION_EMAIL
          ) ?
            "pending"
          : "disabled",
      },
    });

    const integrationStatus = await dispatchLeadIntegrations({
      id: lead.id,
      ...leadPayload,
      pageTag,
      quickSummary,
      calendar,
    });
    const emailStatus = await sendLeadEmails({
      lead: {
        ...leadPayload,
        pageTag,
        quickSummary,
        calendar,
      },
      calendar,
    });

    lead.integrationStatus = integrationStatus;
    lead.emailStatus = emailStatus;
    await lead.save();

    return res.status(201).json({
      message: "Consultation request captured",
      leadId: lead.id,
      qualificationTier: lead.qualificationTier,
      pageTag,
      quickSummary,
      redirectToCalendar: calendar.redirectToCalendar,
      calendarReason: calendar.reason,
      redirectUrl: calendar.redirectUrl,
    });
  } catch (error) {
    return next(error);
  }
};

const listConsultationLeads = async (req, res, next) => {
  try {
    const leads = await ConsultationLead.find()
      .sort({ submittedAt: -1 })
      .limit(200);
    return res.status(200).json(leads);
  } catch (error) {
    return next(error);
  }
};

const testEmailConfiguration = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "email is required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "email is invalid" });
    }

    const result = await sendLeadEmails({
      lead: {
        name: "Test User",
        email,
        phone: "9999999999",
        sourcePage: "/test",
        serviceInterest: "Test",
        audience: "",
        offer: "",
        sebiRegistered: null,
        quickSummary: "Test email configuration",
        calendar: {
          redirectToCalendar: false,
          reason: "test",
          redirectUrl: "",
        },
      },
      calendar: {
        redirectToCalendar: false,
        reason: "test",
        redirectUrl: "",
      },
    });

    return res.status(200).json({
      message: "Test email sent",
      result,
      provider:
        process.env.SMTP_HOST ? "nodemailer"
        : process.env.RESEND_API_KEY ? "resend"
        : "none",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  submitConsultationLead,
  listConsultationLeads,
  testEmailConfiguration,
};
