import Profile from "../models/profile.model.js";

export async function getProfile(req, res) {
  try {
    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({ error: "Profile not found. Run npm run seed first." });
    }

    res.json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not load the profile" });
  }
}
