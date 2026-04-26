const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToDatabase = require("./config/db");
const routes = require("./routes/user");

dotenv.config();

const app = express();

const defaultAllowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://civik-reporting-system.vercel.app",
];

const allowedOrigins = new Set(
  (process.env.CORS_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
);

for (const origin of defaultAllowedOrigins) {
  allowedOrigins.add(origin);
}

const isAllowedOrigin = (origin) => {
  if (!origin) {
    return true;
  }

  if (allowedOrigins.has(origin)) {
    return true;
  }

  try {
    const { hostname } = new URL(origin);
    return hostname === "localhost" || hostname === "127.0.0.1" || hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
};

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    next(error);
  }
});

app.use("/", routes);

app.use((error, req, res, next) => {
  if (error.message === "Not allowed by CORS") {
    return res.status(403).json({ message: error.message });
  }

  console.error(error);

  if (res.headersSent) {
    return next(error);
  }

  return res.status(500).json({ message: "Internal server error" });
});

module.exports = app;
