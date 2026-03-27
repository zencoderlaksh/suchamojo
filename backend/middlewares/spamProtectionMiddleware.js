const SPAM_TERMS = [
  'bitcoin',
  'casino',
  'loan',
  'seo service',
  'viagra',
  'adult',
  'porn',
  'backlink',
];

const spamProtection = (req, res, next) => {
  const website = String(req.body.website || '').trim();
  if (website) {
    return res.status(400).json({ message: 'Spam detected' });
  }

  const text = [
    req.body.name,
    req.body.email,
    req.body.phone,
    req.body.category,
    req.body.serviceInterest,
    req.body.offer,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  const matchedTerm = SPAM_TERMS.find((term) => text.includes(term));
  if (matchedTerm) {
    return res.status(400).json({ message: 'Spam content blocked' });
  }

  return next();
};

module.exports = {
  spamProtection,
};
