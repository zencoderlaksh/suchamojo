const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const blogRoutes = require('./routes/blogRoutes');
const leadRoutes = require('./routes/leadRoutes');
const seoRoutes = require('./routes/seoRoutes');
const configRoutes = require('./routes/configRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.set('etag', 'strong');
app.use(express.json({ limit: '200kb' }));
app.use(express.urlencoded({ extended: true, limit: '200kb' }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,x-admin-key');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  return next();
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'suchamojo-backend',
    date: new Date().toISOString(),
  });
});

app.use('/api/blogs', blogRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/seo', seoRoutes);
app.use('/api/config', configRoutes);
app.use('/api/settings', settingsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Something went wrong',
  });
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
