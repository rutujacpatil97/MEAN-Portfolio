import { Component, computed, inject, signal } from "@angular/core";
import { ProfileService } from "../../core/profile.service";
import { JourneyStopView } from "../../core/profile.model";
import { LocalTrainComponent } from "./local-train.component";
import { PlatformIndicatorComponent } from "./platform-indicator.component";
import { toStopView } from "./journey-stop";

/** How long the ride between two stations lasts (matches the CSS transition on the station strip). */
const RIDE_DURATION_MS = 2400;

/** Experience and education as one train ride, newest stop first. */
@Component({
  selector: "app-journey",
  standalone: true,
  imports: [PlatformIndicatorComponent, LocalTrainComponent],
  templateUrl: "./journey.component.html",
  styleUrl: "./journey.component.css",
})
export class JourneyComponent {
  private profileService = inject(ProfileService);

  readonly stops = computed<JourneyStopView[]>(() =>
    (this.profileService.profile()?.journey ?? [])
      .slice()
      .reverse()
      .map(toStopView),
  );

  readonly currentStopIndex = signal(0);
  readonly currentStop = computed(() => this.stops()[this.currentStopIndex()]);
  readonly isMoving = signal(false);
  readonly hasStartedRide = signal(false);

  rideTo(stopIndex: number) {
    const isAlreadyThere = stopIndex === this.currentStopIndex();
    const isOutOfRange = stopIndex < 0 || stopIndex >= this.stops().length;
    if (this.isMoving() || isAlreadyThere || isOutOfRange) return;

    this.currentStopIndex.set(stopIndex);
    this.isMoving.set(true);
    this.hasStartedRide.set(true);

    const prefersReducedMotion = matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setTimeout(
      () => this.isMoving.set(false),
      prefersReducedMotion ? 100 : RIDE_DURATION_MS,
    );
  }
}
