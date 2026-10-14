import { HttpClient } from "@angular/common/http";
import { Component, effect, inject, signal } from "@angular/core";
import { API_URL } from "../../core/api.config";
import { ProfileService } from "../../core/profile.service";

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

@Component({
  selector: "app-contact",
  standalone: true,
  templateUrl: "./contact.component.html",
  styleUrl: "./contact.component.css",
})
export class ContactComponent {
  private http = inject(HttpClient);

  readonly profile = inject(ProfileService).profile;
  readonly qrCodeUrl = signal("");
  readonly isSending = signal(false);
  readonly statusMessage = signal("");

  constructor() {
    // Build the LinkedIn QR code as soon as the profile is available.
    effect(() => {
      const linkedinUrl = this.profile()?.contact?.linkedin;
      if (linkedinUrl) this.createQrCode(linkedinUrl);
    });
  }

  /** The qrcode library is only needed here, so it is loaded on demand. */
  private async createQrCode(url: string) {
    try {
      const { default: QRCode } = await import("qrcode");
      this.qrCodeUrl.set(
        await QRCode.toDataURL(url, {
          margin: 1,
          width: 360,
          errorCorrectionLevel: "M",
        }),
      );
    } catch {
      // The QR code is a nice extra; the LinkedIn link next to it still works.
    }
  }

  sendMessage(name: string, email: string, message: string) {
    const details = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    };

    if (
      !details.name ||
      !EMAIL_PATTERN.test(details.email) ||
      !details.message
    ) {
      this.statusMessage.set(
        "Please enter your name, a valid email and a message.",
      );
      return;
    }

    this.isSending.set(true);
    this.statusMessage.set("");
    this.http.post(`${API_URL}/contact`, details).subscribe({
      next: () => {
        this.statusMessage.set("Message sent ✓ Thank you for reaching out!");
        this.isSending.set(false);
      },
      error: () => {
        this.statusMessage.set(
          "Could not send right now. Please email me directly.",
        );
        this.isSending.set(false);
      },
    });
  }
}
