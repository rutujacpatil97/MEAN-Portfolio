import { Component, Input } from "@angular/core";

interface Coach {
  offsetX: number; // position of the coach along the train
  number: string;
  isLeading: boolean; // the coach with the driver's cab
  hasPantograph: boolean;
}

/** A three-coach Mumbai suburban (Central Railway) local train, drawn in SVG. */
@Component({
  selector: "app-local-train",
  standalone: true,
  templateUrl: "./local-train.component.html",
  styleUrl: "./local-train.component.css",
})
export class LocalTrainComponent {
  /** Spins the wheels and lights the headlamp while the train is running. */
  @Input() isMoving = false;

  readonly coaches: Coach[] = [
    { offsetX: 0, number: "5262T", isLeading: false, hasPantograph: false },
    { offsetX: 368, number: "5262M", isLeading: false, hasPantograph: true },
    { offsetX: 736, number: "5262C", isLeading: true, hasPantograph: false },
  ];
  readonly couplerPositions = [358, 726];
  readonly doorPositions = [56, 264];
  readonly windowPositions = [116, 190];
  readonly wheelPositions = [56, 88, 272, 304];
}
