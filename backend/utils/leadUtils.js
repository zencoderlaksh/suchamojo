const QUALIFICATION_MAP = {
  '1:1 consulting': 'high',
  'team training': 'high',
  cohort: 'medium',
  'mfd branding': 'high',
};

const normalizeWhitespace = (value = '') => value.toString().trim().replace(/\s+/g, ' ');

const detectDeviceType = (userAgent = '') => {
  const ua = userAgent.toLowerCase();

  if (!ua) return 'unknown';
  if (ua.includes('tablet') || ua.includes('ipad')) return 'tablet';
  if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) return 'mobile';
  return 'desktop';
};

const getQualificationTier = (serviceInterest = '', category = '') => {
  const service = normalizeWhitespace(serviceInterest).toLowerCase();
  const categoryValue = normalizeWhitespace(category).toLowerCase();

  return QUALIFICATION_MAP[service] || QUALIFICATION_MAP[categoryValue] || 'medium';
};

module.exports = {
  detectDeviceType,
  getQualificationTier,
  normalizeWhitespace,
};
