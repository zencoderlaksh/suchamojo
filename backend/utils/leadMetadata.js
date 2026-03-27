const PAGE_TAGS = {
  homepage: 'home',
  'mfd-page': 'mfd',
  contact: 'contact',
  'book-a-call': 'booking',
};

const getPageTag = (sourcePage = '') => {
  const normalized = sourcePage.toLowerCase();
  return PAGE_TAGS[normalized] || normalized || 'general';
};

const buildQuickSummary = (lead) =>
  `${lead.name} (${lead.email}) requested ${lead.serviceInterest} from ${lead.sourcePage}. Audience: ${lead.audience || 'general'}. Offer: ${lead.offer || 'standard'}. Tier: ${lead.qualificationTier}. Device: ${lead.deviceType}.`;

module.exports = {
  getPageTag,
  buildQuickSummary,
};
