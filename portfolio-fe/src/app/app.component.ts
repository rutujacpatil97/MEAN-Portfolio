import { Component, inject } from "@angular/core";
import { ProfileService } from "./core/profile.service";
import { SiteNavComponent } from "./layout/site-nav.component";
import { AwardsComponent } from "./sections/awards/awards.component";
import { ContactComponent } from "./sections/contact/contact.component";
import { HeroComponent } from "./sections/hero/hero.component";
import { JourneyComponent } from "./sections/journey/journey.component";
import { ProjectsComponent } from "./sections/projects/projects.component";
import { SkillsComponent } from "./sections/skills/skills.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    SiteNavComponent,
    HeroComponent,
    JourneyComponent,
    SkillsComponent,
    ProjectsComponent,
    AwardsComponent,
    ContactComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class App {
  private profileService = inject(ProfileService);

  readonly profile = this.profileService.profile;
  readonly dataSource = this.profileService.dataSource;
  readonly currentYear = new Date().getFullYear();
}
