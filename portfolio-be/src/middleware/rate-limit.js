import { rateLimit } from "express-rate-limit";

/** A visitor may send at most 5 contact messages per hour. */
export const contactRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many messages. Please try again later or email me directly." },
});
