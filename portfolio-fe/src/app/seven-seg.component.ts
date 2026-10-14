import { Component, Input } from "@angular/core";

// Segment shapes of one digit (viewBox 40 x 70) and which segments each character lights up.
const SEGMENTS = [
  { k: "a", d: "M7 3L10 0H30L33 3L30 6H10Z" },
  { k: "b", d: "M37 7L40 10V30L37 33L34 30V10Z" },
  { k: "c", d: "M37 37L40 40V60L37 63L34 60V40Z" },
  { k: "d", d: "M7 67L10 64H30L33 67L30 70H10Z" },
  { k: "e", d: "M3 37L6 40V60L3 63L0 60V40Z" },
  { k: "f", d: "M3 7L6 10V30L3 33L0 30V10Z" },
  { k: "g", d: "M7 35L10 32H30L33 35L30 38H10Z" },
];
const LIT: Record<string, string> = {
  "0": "abcdef", "1": "bc", "2": "abdeg", "3": "abcdg", "4": "bcfg",
  "5": "acdfg", "6": "acdefg", "7": "abc", "8": "abcdefg", "9": "abcdfg", "-": "g",
};

/** Seven-segment display. Size and colours come from CSS variables: --h, --on, --off, --glow. */
@Component({
  selector: "seven-seg",
  standalone: true,
  template: `@for (c of chars(); track $index) {
    @if (c === ".") { <i class="dot"></i> } @else {
      <svg viewBox="0 0 40 70" aria-hidden="true">
        @for (s of segments; track s.k) { <path [attr.d]="s.d" [class.on]="lit(c, s.k)" /> }
      </svg>
    }
  }`,
  styles: [`
    :host { display: inline-flex; align-items: flex-end; gap: calc(var(--h, 40px) * .14); height: var(--h, 40px); }
    svg { height: 100%; width: auto; }
    path { fill: var(--off, #2a2010); transition: fill .3s; }
    path.on { fill: var(--on, #ffb43a); filter: drop-shadow(0 0 3px var(--glow, #ffb43a99)); }
    .dot { width: calc(var(--h, 40px) * .1); height: calc(var(--h, 40px) * .1); margin: 0 calc(var(--h, 40px) * -.04); border-radius: 50%; background: var(--on, #ffb43a); box-shadow: 0 0 5px var(--glow, #ffb43a99); }
  `],
})
export class SevenSeg {
  @Input() value = "";
  segments = SEGMENTS;
  chars = () => this.value.split("");
  lit = (c: string, k: string) => (LIT[c] ?? "").includes(k);
}
