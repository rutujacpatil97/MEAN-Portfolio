import { Component, computed, inject, signal } from "@angular/core";
import { ArchitectureLayer } from "../../core/profile.model";
import { ProfileService } from "../../core/profile.service";
import { ProjectTicket, toProjectTicket } from "./project-ticket";

type ProjectFilter = "All" | "MEAN" | "Insurance";

/** Projects as railway tickets. Clicking a ticket punches it and opens the details. */
@Component({
  selector: "app-projects",
  standalone: true,
  templateUrl: "./projects.component.html",
  styleUrl: "./projects.component.css",
})
export class ProjectsComponent {
  private profile = inject(ProfileService).profile;

  readonly filters: ProjectFilter[] = ["All", "MEAN", "Insurance"];
  readonly activeFilter = signal<ProjectFilter>("All");

  readonly tickets = computed<ProjectTicket[]>(() =>
    (this.profile()?.projects ?? []).map(toProjectTicket),
  );

  /** Only one ticket is open at a time. */
  readonly openTicketIndex = signal<number | null>(null);
  readonly selectedLayerName = signal("");

  toggleTicket(index: number) {
    this.openTicketIndex.update((openIndex) =>
      openIndex === index ? null : index,
    );
    this.selectedLayerName.set("");
  }

  /** Tickets that do not match the active filter are dimmed, not removed. */
  matchesFilter(ticket: ProjectTicket): boolean {
    const filter = this.activeFilter();
    return filter === "All" || ticket.categories.includes(filter);
  }

  /** The architecture layer whose detail text is showing (the first one until another is picked). */
  selectedLayer(ticket: ProjectTicket): ArchitectureLayer | undefined {
    return (
      ticket.layers.find((layer) => layer.name === this.selectedLayerName()) ??
      ticket.layers[0]
    );
  }
}
