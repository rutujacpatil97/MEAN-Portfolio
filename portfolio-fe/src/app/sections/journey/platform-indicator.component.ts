import { Component, Input } from "@angular/core";
import { JourneyStopView } from "../../core/profile.model";
import { SevenSegComponent } from "../../shared/seven-seg.component";

/** The LED platform board that shows the details of the station the train is standing at. */
@Component({
  selector: "app-platform-indicator",
  standalone: true,
  imports: [SevenSegComponent],
  templateUrl: "./platform-indicator.component.html",
  styleUrl: "./platform-indicator.component.css",
})
export class PlatformIndicatorComponent {
  @Input({ required: true }) stop!: JourneyStopView;
  @Input() platformNumber = 1;
  /** True while the train is on its way to this stop. */
  @Input() isArriving = false;

  get platformDigits(): string {
    return this.platformNumber.toString().padStart(2, "0");
  }
}
