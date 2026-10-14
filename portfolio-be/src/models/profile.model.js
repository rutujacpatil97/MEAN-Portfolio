import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: String,
  title: String,
  tagline: String,
  summary: String,
  contact: {
    email: String,
    phone: String,
    location: String,
    linkedin: String,
  },
  skills: Object, // { "Frontend": ["Angular", "RxJS"], "Backend": [...] }
  journey: [
    {
      kind: String, // "edu" or "work"
      station: String, // employer, for jobs
      place: String, // school, for education
      title: String,
      period: String,
      points: [String],
      short: String, // short name for the station sign
    },
  ],
  projects: [
    {
      name: String,
      desc: String,
      stack: String,
      links: [{ label: String, url: String }],
      architecture: [{ name: String, detail: String }],
    },
  ],
  awards: [{ title: String, note: String }],
  certs: [String],
});

export default mongoose.model("Profile", profileSchema, process.env.PROFILE_COLLECTION || "profiles");
