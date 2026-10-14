import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const isConfigured = Boolean(env.mail.host && env.mail.user && env.mail.password && env.mail.notifyTo);

const transporter = isConfigured
  ? nodemailer.createTransport({
      host: env.mail.host,
      port: env.mail.port,
      secure: env.mail.port === 465,
      auth: { user: env.mail.user, pass: env.mail.password },
    })
  : null;

/**
 * Emails me about a new contact message. Does nothing when SMTP is not configured.
 * Callers should not wait for it: a failed email must never fail the visitor's request.
 */
export async function notifyAboutContactMessage({ name, email, message }) {
  if (!transporter) return;

  await transporter.sendMail({
    from: env.mail.user,
    to: env.mail.notifyTo,
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });
}
