import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { API_URL } from "./api.config";
import { Profile } from "./profile.model";

/**
 * Loads the whole portfolio once and shares it with every section.
 * The API is tried first; if it is down (or empty) the bundled assets/profile.json is used,
 * so the page never ends up blank.
 */
@Injectable({ providedIn: "root" })
export class ProfileService {
  private http = inject(HttpClient);

  readonly profile = signal<Profile | null>(null);
  readonly isLoading = signal(true);
  readonly loadError = signal("");
  /** Where the data on screen came from; shown in the footer so stale data is easy to spot. */
  readonly dataSource = signal("");

  constructor() {
    this.loadFromApi();
  }

  private loadFromApi() {
    this.http.get<Profile | null>(`${API_URL}/profile`).subscribe({
      next: (profile) =>
        profile
          ? this.showProfile(profile, "API (MongoDB)")
          : this.loadBundledCopy("API returned empty data"),
      error: (error) => this.loadBundledCopy(error),
    });
  }

  private loadBundledCopy(reason: unknown) {
    console.warn(
      "[portfolio] using bundled assets/profile.json because:",
      reason,
    );
    this.http.get<Profile>("assets/profile.json").subscribe({
      next: (profile) =>
        this.showProfile(profile, "bundled assets/profile.json (API not used)"),
      error: () => {
        this.isLoading.set(false);
        this.loadError.set("Could not load portfolio data.");
      },
    });
  }

  private showProfile(profile: Profile, source: string) {
    this.profile.set(profile);
    this.dataSource.set(source);
    this.isLoading.set(false);
    this.loadError.set("");
  }
}
