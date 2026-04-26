const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB, isDBConnected } = require("./config/db");
const blogRoutes = require("./routes/blogRoutes");
const leadRoutes = require("./routes/leadRoutes");
const userRoutes = require("./routes/userRoutes");
const seoRoutes = require("./routes/seoRoutes");
const configRoutes = require("./routes/configRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");

const { protect } = require("./middlewares/authMiddleware");
const { isAdmin } = require("./middlewares/adminMiddleware");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.set("etag", "strong");
app.use(express.json({ limit: "200kb" }));
app.use(express.urlencoded({ extended: true, limit: "200kb" }));

const parseCorsOrigins = () => {
  const env = process.env.CORS_ORIGIN || process.env.CORS_ORIGINS;
  if (env) return env.split(",").map((o) => o.trim());
  return [
    "http://localhost:5173",
    "https://suchamojo.netlify.app",
    "https://suchamojo.com",
    "https://www.suchamojo.com",
  ];
};

const allowedOrigins = parseCorsOrigins();

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      // Log blocked origins for debugging
      console.warn(`CORS blocked origin: ${origin}`);
      return callback(null, true); // Temporarily allow all for debugging
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-admin-key"],
  }),
);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "suchamojo-backend",
    dbConnected: isDBConnected(),
    date: new Date().toISOString(),
  });
});

// Middleware to check DB connection before handling data routes
const requireDB = (req, res, next) => {
  if (!isDBConnected()) {
    return res.status(503).json({
      message: "Database not connected. Please check server configuration.",
    });
  }
  next();
};

app.use("/api/users", requireDB, userRoutes);
app.use("/api/blogs", requireDB, blogRoutes);
app.use("/api/leads", requireDB, leadRoutes);
app.use("/api/seo", requireDB, seoRoutes);
app.use("/api/config", requireDB, configRoutes);
app.use("/api/settings", requireDB, settingsRoutes);
app.use("/api/testimonials", requireDB, testimonialRoutes);

app.use("/api/admin/blogs", protect, isAdmin, blogRoutes);
app.use("/api/admin/leads", protect, isAdmin, leadRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(
    `[ERROR ${statusCode}] ${req.method} ${req.originalUrl}:`,
    err.message,
  );
  if (err.stack) console.error(err.stack);
  res.status(statusCode).json({
    message: err.message || "Something went wrong",
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
