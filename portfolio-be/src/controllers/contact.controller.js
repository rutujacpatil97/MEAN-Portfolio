import Contact from "../models/contact.model.js";

export async function saveMessage(req, res) {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email and message are required" });
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email" });
  }

  try {
    await Contact.create({ name, email, message });
    res.status(201).json({ message: "Message received" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not save the message" });
  }
}
