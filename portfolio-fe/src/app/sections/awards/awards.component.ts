import { Component, computed, inject, signal } from "@angular/core";
import { ProfileService } from "../../core/profile.service";

// Heights of the stars as a percentage of the sky; they zig-zag so neighbouring labels never collide.
const STAR_HEIGHTS = [52, 24, 54, 20, 52, 28, 48];

@Component({
  selector: "app-awards",
  standalone: true,
  templateUrl: "./awards.component.html",
  styleUrl: "./awards.component.css",
})
export class AwardsComponent {
  readonly profile = inject(ProfileService).profile;

  /** The first award is open from the start, so the detail panel is never empty. */
  readonly selectedAwardIndex = signal(0);

  /** Small background stars. Fixed arithmetic keeps the sky identical on every visit. */
  readonly backgroundStars = Array.from({ length: 120 }, (_, index) => ({
    left: (index * 37) % 100,
    top: (index * 61) % 100,
    radius: (index % 3) * 0.5 + 0.5,
    twinkleDelay: (index % 7) * 0.6,
  }));

  /** One bright star per award, spread evenly from left to right (positions are percentages). */
  readonly awardStars = computed(() => {
    const awards = this.profile()?.awards ?? [];
    const spacing = 82 / Math.max(1, awards.length - 1);
    return awards.map((award, index) => ({
      ...award,
      left: 9 + index * spacing,
      top: STAR_HEIGHTS[index % STAR_HEIGHTS.length],
    }));
  });

  /** Dashed lines that join each award star to the next one. */
  readonly constellationLinks = computed(() => {
    const stars = this.awardStars();
    return stars.slice(1).map((star, index) => ({
      fromLeft: stars[index].left,
      fromTop: stars[index].top,
      toLeft: star.left,
      toTop: star.top,
    }));
  });

  readonly selectedAward = computed(
    () => this.profile()?.awards[this.selectedAwardIndex()] ?? null,
  );

  selectAward(index: number) {
    this.selectedAwardIndex.set(index);
  }
}
