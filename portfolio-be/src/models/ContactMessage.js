import mongoose from "mongoose";
import { env } from "../config/env.js";

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 120 },
    message: { type: String, required: true, trim: true, maxlength: 1000 },
    isRead: { type: Boolean, default: false }, // tick this in Atlas once you have replied
  },
  { timestamps: { createdAt: true, updatedAt: false }, versionKey: false, collection: env.contactCollection },
);

export const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);
