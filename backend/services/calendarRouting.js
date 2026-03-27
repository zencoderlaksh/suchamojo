const ConsultationLead = require('../models/consultationLeadModel');
const SiteSettings = require('../models/siteSettingsModel');

const getIstDayRange = (date = new Date()) => {
  const offsetMs = 330 * 60 * 1000;
  const istMs = date.getTime() + offsetMs;
  const istDate = new Date(istMs);

  const year = istDate.getUTCFullYear();
  const month = istDate.getUTCMonth();
  const day = istDate.getUTCDate();

  const startUtcMs = Date.UTC(year, month, day) - offsetMs;
  const endUtcMs = Date.UTC(year, month, day + 1) - offsetMs;

  return {
    start: new Date(startUtcMs),
    end: new Date(endUtcMs),
    istWeekday: istDate.getUTCDay(),
  };
};

const resolveCalendarUrl = async (serviceInterest = '', pageTag = '') => {
  const input = `${serviceInterest} ${pageTag}`.toLowerCase();

  if (input.includes('founder') && process.env.CALENDAR_URL_FOUNDERS) {
    return process.env.CALENDAR_URL_FOUNDERS;
  }

  if (
    (input.includes('mfd') || input.includes('mutual fund distributor')) &&
    process.env.CALENDAR_URL_MF_DISTRIBUTORS
  ) {
    return process.env.CALENDAR_URL_MF_DISTRIBUTORS;
  }

  if (
    (input.includes('team') || input.includes('training')) &&
    process.env.CALENDAR_URL_TEAMS
  ) {
    return process.env.CALENDAR_URL_TEAMS;
  }

  const settings = await SiteSettings.findOne({ key: 'default' }).select('calendar.defaultUrl').lean();
  return settings?.calendar?.defaultUrl ||
    process.env.CALENDAR_URL_DEFAULT ||
    process.env.CALENDAR_BOOKING_URL ||
    'https://calendly.com/your-handle/brand-call?hide_event_type_details=1&hide_gdpr_banner=1';
};

const appendTimezoneQuery = (url) => {
  const timezone = process.env.CALENDAR_TIMEZONE || 'Asia/Kolkata';
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}month=&timezone=${encodeURIComponent(timezone)}`;
};

const evaluateCalendarDecision = async ({ serviceInterest, pageTag }) => {
  const provider = process.env.CALENDAR_PROVIDER || 'calendly';
  const timezone = process.env.CALENDAR_TIMEZONE || 'Asia/Kolkata';
  const disableWeekends = process.env.CALENDAR_DISABLE_WEEKENDS === 'true';
  const maxBookingsPerDay = Number(process.env.CALENDAR_MAX_BOOKINGS_PER_DAY || 25);

  const { start, end, istWeekday } = getIstDayRange();
  const dayBookings = await ConsultationLead.countDocuments({
    submittedAt: { $gte: start, $lt: end },
    'calendar.redirectToCalendar': true,
  });

  if (disableWeekends && (istWeekday === 0 || istWeekday === 6)) {
    return {
      provider,
      timezone,
      redirectToCalendar: false,
      reason: 'weekend-disabled',
      redirectUrl: process.env.CALENDAR_FALLBACK_URL || '',
    };
  }

  if (dayBookings >= maxBookingsPerDay) {
    return {
      provider,
      timezone,
      redirectToCalendar: false,
      reason: 'daily-limit-reached',
      redirectUrl: process.env.CALENDAR_FALLBACK_URL || '',
    };
  }

  return {
    provider,
    timezone,
    redirectToCalendar: true,
    reason: 'eligible',
    redirectUrl: appendTimezoneQuery(await resolveCalendarUrl(serviceInterest, pageTag)),
  };
};

module.exports = {
  evaluateCalendarDecision,
};
