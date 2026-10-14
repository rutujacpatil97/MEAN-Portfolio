import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDatabase() {
  if (!env.mongoUri) {
    throw new Error("MONGO_URI is not set. Copy .env.example to .env and fill it in.");
  }
  await mongoose.connect(env.mongoUri);
  console.log(`MongoDB connected (database: ${mongoose.connection.name})`);
}

export function disconnectDatabase() {
  return mongoose.disconnect();
}
