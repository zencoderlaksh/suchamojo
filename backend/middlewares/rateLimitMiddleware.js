const buckets = new Map();

const leadRateLimit = (req, res, next) => {
  const now = Date.now();
  const windowMs = Number(process.env.LEAD_RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000);
  const maxAttempts = Number(process.env.LEAD_RATE_LIMIT_MAX || 10);
  const key = `${req.ip || 'unknown'}:consultation`;

  const bucket = buckets.get(key) || { count: 0, resetAt: now + windowMs };

  if (now > bucket.resetAt) {
    bucket.count = 0;
    bucket.resetAt = now + windowMs;
  }

  bucket.count += 1;
  buckets.set(key, bucket);

  if (bucket.count > maxAttempts) {
    return res.status(429).json({
      message: 'Too many consultation attempts. Please try again in a few minutes.',
    });
  }

  return next();
};

module.exports = {
  leadRateLimit,
};
