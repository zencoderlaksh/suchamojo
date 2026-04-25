const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
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
  const env = process.env.CORS_ORIGINS;
  if (env) return env.split(",").map((o) => o.trim());
  return ["http://localhost:5173", "https://suchamojo.netlify.app"];
};

app.use(
  cors({
    origin: parseCorsOrigins(),
    credentials: true,
  }),
);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "suchamojo-backend",
    date: new Date().toISOString(),
  });
});

app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/seo", seoRoutes);
app.use("/api/config", configRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/testimonials", testimonialRoutes);

app.use("/api/admin/blogs", protect, isAdmin, blogRoutes);
app.use("/api/admin/leads", protect, isAdmin, leadRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Something went wrong",
  });
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
