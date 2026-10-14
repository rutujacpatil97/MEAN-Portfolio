import { Component, inject, signal } from "@angular/core";
import { ProfileService } from "../../core/profile.service";

@Component({
  selector: "app-hero",
  standalone: true,
  templateUrl: "./hero.component.html",
  styleUrl: "./hero.component.css",
})
export class HeroComponent {
  private profileService = inject(ProfileService);

  readonly profile = this.profileService.profile;
  readonly isLoading = this.profileService.isLoading;
  readonly loadError = this.profileService.loadError;

  readonly isTicketFlipped = signal(false);
  readonly hasPhotoFailed = signal(false);

  toggleTicket() {
    this.isTicketFlipped.update((isFlipped) => !isFlipped);
  }
}
