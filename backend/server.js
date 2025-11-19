// server.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import contentRoutes from "./routes/content.js";
import adminRoutes from "./routes/admin.js";
import paymentRoutes from "./routes/payment.js";

const app = express();

// -------------------------------
// Environment Variables
// -------------------------------
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";
const CLIENT_URL =
  process.env.CLIENT_URL ||
  (NODE_ENV === "production" ? "https://ltprep.com" : "http://localhost:5173");

// -------------------------------
// Middleware
// -------------------------------
app.use(express.json({ limit: "2mb" }));

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

// -------------------------------
// API Routes
// -------------------------------
app.use("/api/auth", authRoutes);
app.use("/api", contentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);

// -------------------------------
// Test Route
// -------------------------------
app.get("/", (req, res) => {
  res.json({ ok: true, message: "Study Portal API running 🚀" });
});

// -------------------------------
// Database Connection & Server Start
// -------------------------------
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `✅ Server running on ${
          NODE_ENV === "production" ? "https://ltprep.com" : `http://localhost:${PORT}`
        }`
      );
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  });

