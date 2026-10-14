import { Component, computed, inject, signal } from "@angular/core";
import { ProfileService } from "../../core/profile.service";

/** Colours of the jumper wires, one per skill group. */
const WIRE_COLOURS = [
  "#e0584f",
  "#4f8fe0",
  "#e8a13a",
  "#4fb286",
  "#b583e0",
  "#e3e7ec",
];

/** Layout of one skill group on the circuit board: an IC chip wired to the central processor. */
interface SkillChip {
  name: string;
  skills: { name: string; y: number }[];
  x: number;
  y: number;
  width: number;
  wireColour: string;
  wirePath: string;
  wireStart: { x: number; y: number };
  wireEnd: { x: number; y: number };
}

@Component({
  selector: "app-skills",
  standalone: true,
  templateUrl: "./skills.component.html",
  styleUrl: "./skills.component.css",
})
export class SkillsComponent {
  private profileService = inject(ProfileService);

  readonly profile = this.profileService.profile;
  readonly currentYear = new Date().getFullYear();
  readonly hoveredChip = signal("");

  // Decorative parts of the board.
  readonly mountingHoles = [
    { x: 26, y: 26 },
    { x: 974, y: 26 },
    { x: 26, y: 654 },
    { x: 974, y: 654 },
  ];
  readonly copperTraces = [
    "M300 120H340L362 98H455V270",
    "M700 120H660L638 98H545V270",
    "M300 590H350L372 612H475V430",
    "M700 590H650L628 612H525V430",
  ];
  readonly smdParts = [
    { label: "R1", x: 372, y: 246 },
    { label: "C2", x: 602, y: 246 },
    { label: "R3", x: 372, y: 420 },
    { label: "C4", x: 602, y: 420 },
  ];
  readonly processorPinOffsets = [0, 1, 2, 3, 4];
  readonly chipPinRows = [0, 1, 2, 3, 4, 5, 6];

  readonly chips = computed<SkillChip[]>(() =>
    Object.entries(this.profile()?.skills ?? {}).map(
      ([name, skills], index) => {
        const isOnLeft = index < 3;
        const row = index % 3;
        const width = 230;
        const x = isOnLeft ? 30 : 740;
        const y = 30 + row * 215;

        // The wire leaves the chip's middle pin and plugs into one of the processor's side pins.
        const wireStart = { x: isOnLeft ? x + width + 10 : x - 10, y: y + 92 };
        const wireEnd = { x: isOnLeft ? 420 : 580, y: 300 + row * 50 };
        const curve = isOnLeft ? 60 : -60;

        return {
          name,
          skills: skills.map((skill, skillIndex) => ({
            name: skill,
            y: y + 54 + skillIndex * 21,
          })),
          x,
          y,
          width,
          wireColour: WIRE_COLOURS[index],
          wireStart,
          wireEnd,
          wirePath:
            `M${wireStart.x} ${wireStart.y}` +
            `C${wireStart.x + curve} ${wireStart.y} ${wireEnd.x - curve} ${wireEnd.y} ${wireEnd.x} ${wireEnd.y}`,
        };
      },
    ),
  );
}
