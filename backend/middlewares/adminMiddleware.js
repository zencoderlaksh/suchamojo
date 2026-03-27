const requireAdminAccess = (req, res, next) => {
  const adminKey = req.headers['x-admin-key'];
  const expectedKey = process.env.CMS_ADMIN_KEY;

  if (!expectedKey) {
    return res.status(500).json({
      message: 'CMS_ADMIN_KEY is not configured on server',
    });
  }

  if (!adminKey || adminKey !== expectedKey) {
    return res.status(403).json({
      message: 'Admin access required',
    });
  }

  return next();
};

module.exports = { requireAdminAccess };
