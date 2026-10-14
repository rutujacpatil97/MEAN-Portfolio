import mongoose from "mongoose";
import { env } from "../config/env.js";

const { Schema } = mongoose;

// Sub-documents never need an _id of their own.
const noId = { _id: false };

const contactSchema = new Schema(
  {
    email: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    location: { type: String, trim: true },
    linkedin: { type: String, trim: true },
  },
  noId,
);

/** One stop of the career timeline: a job ("work") or a school ("edu"). */
const journeyStopSchema = new Schema(
  {
    kind: { type: String, enum: ["edu", "work"], required: true },
    // Jobs are named by "station" (the employer); schools are named by "place".
    station: { type: String, trim: true, required: function () { return this.kind === "work"; } },
    place: { type: String, trim: true, required: function () { return this.kind === "edu"; } },
    title: { type: String, required: true, trim: true },
    period: { type: String, required: true, trim: true },
    points: { type: [String], default: [] },
    short: { type: String, trim: true }, // short name for the station sign
  },
  noId,
);

const projectSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    desc: { type: String, required: true, trim: true },
    stack: { type: String, required: true, trim: true }, // comma separated technologies
    links: { type: [new Schema({ label: String, url: String }, noId)], default: undefined },
    architecture: { type: [new Schema({ name: String, detail: String }, noId)], default: undefined },
  },
  noId,
);

const awardSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    note: { type: String, required: true, trim: true },
  },
  noId,
);

/** There is exactly one profile document in the collection; it is found by this slug. */
export const PROFILE_SLUG = "main";

/** Every field a profile document may contain. The cleanup script uses this list too. */
export const PROFILE_FIELDS = [
  "slug", "name", "title", "tagline", "summary", "contact", "skills", "journey", "projects", "awards", "certs",
];

const profileSchema = new Schema(
  {
    slug: { type: String, default: PROFILE_SLUG, unique: true, immutable: true },
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    tagline: { type: String, trim: true },
    summary: { type: String, trim: true },
    contact: { type: contactSchema, required: true },
    skills: { type: Map, of: [String], default: {} }, // { "Frontend": ["Angular", ...], ... }
    journey: { type: [journeyStopSchema], default: [] },
    projects: { type: [projectSchema], default: [] },
    awards: { type: [awardSchema], default: [] },
    certs: { type: [String], default: [] },
  },
  { timestamps: true, versionKey: false, collection: env.profileCollection },
);

export const Profile = mongoose.model("Profile", profileSchema);
