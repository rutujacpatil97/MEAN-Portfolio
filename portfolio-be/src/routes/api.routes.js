import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { saveMessage } from "../controllers/contact.controller.js";
import { getProfile } from "../controllers/profile.controller.js";

const router = Router();

// stops one visitor from flooding the contact form
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  message: { error: "Too many messages, please try again later" },
});

router.get("/profile", getProfile);
router.post("/contact", contactLimiter, saveMessage);

export default router;
