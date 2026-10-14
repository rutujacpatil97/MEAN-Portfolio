import "dotenv/config";

/** "a, b ,c" -> ["a", "b", "c"] */
const toList = (value) =>
  (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

/** Every setting the app reads from the environment, in one place. */
export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 3000),
  mongoUri: process.env.MONGO_URI ?? "",
  corsOrigins: toList(process.env.CORS_ORIGINS ?? "http://localhost:4200"),
  profileCollection: process.env.PROFILE_COLLECTION ?? "profiles",
  contactCollection: process.env.CONTACT_COLLECTION ?? "contacts",
  mail: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    notifyTo: process.env.CONTACT_NOTIFY_TO,
  },
};
