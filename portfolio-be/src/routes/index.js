import { Router } from "express";
import mongoose from "mongoose";
import { createContactMessage } from "../controllers/contact.controller.js";
import { getProfile } from "../controllers/profile.controller.js";
import { contactRateLimit } from "../middleware/rate-limit.js";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  const isDatabaseConnected = mongoose.connection.readyState === 1;
  res.json({ status: "ok", database: isDatabaseConnected ? "connected" : "disconnected", uptimeSeconds: Math.round(process.uptime()) });
});

apiRouter.get("/profile", getProfile);
apiRouter.post("/contact", contactRateLimit, createContactMessage);
