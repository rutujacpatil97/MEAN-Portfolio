import { Component, Input } from "@angular/core";

// Shapes of the seven segments of one digit, drawn in a 40 x 70 box.
const SEGMENTS = [
  { name: "a", path: "M7 3L10 0H30L33 3L30 6H10Z" },
  { name: "b", path: "M37 7L40 10V30L37 33L34 30V10Z" },
  { name: "c", path: "M37 37L40 40V60L37 63L34 60V40Z" },
  { name: "d", path: "M7 67L10 64H30L33 67L30 70H10Z" },
  { name: "e", path: "M3 37L6 40V60L3 63L0 60V40Z" },
  { name: "f", path: "M3 7L6 10V30L3 33L0 30V10Z" },
  { name: "g", path: "M7 35L10 32H30L33 35L30 38H10Z" },
];

// Which segments are lit for each character.
const LIT_SEGMENTS: Record<string, string> = {
  "0": "abcdef",
  "1": "bc",
  "2": "abdeg",
  "3": "abcdg",
  "4": "bcfg",
  "5": "acdfg",
  "6": "acdefg",
  "7": "abc",
  "8": "abcdefg",
  "9": "abcdfg",
  "-": "g",
};

/**
 * A seven-segment display. Size and colours are set from outside with CSS variables:
 * --digit-height, --segment-on, --segment-off and --segment-glow.
 */
@Component({
  selector: "app-seven-seg",
  standalone: true,
  templateUrl: "./seven-seg.component.html",
  styleUrl: "./seven-seg.component.css",
})
export class SevenSegComponent {
  @Input() value = "";

  readonly segments = SEGMENTS;

  get characters(): string[] {
    return this.value.split("");
  }

  isLit(character: string, segmentName: string): boolean {
    return (LIT_SEGMENTS[character] ?? "").includes(segmentName);
  }
}
