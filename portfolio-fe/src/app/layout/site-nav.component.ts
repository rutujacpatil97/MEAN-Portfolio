import {
  Component,
  DestroyRef,
  HostListener,
  inject,
  signal,
} from "@angular/core";

interface NavLink {
  sectionId: string;
  label: string;
}

@Component({
  selector: "app-site-nav",
  standalone: true,
  templateUrl: "./site-nav.component.html",
  styleUrl: "./site-nav.component.css",
})
export class SiteNavComponent {
  private destroyRef = inject(DestroyRef);

  readonly links: NavLink[] = [
    { sectionId: "journey", label: "Journey" },
    { sectionId: "skills", label: "Skills" },
    { sectionId: "projects", label: "Projects" },
    { sectionId: "achievements", label: "Awards" },
    { sectionId: "contact", label: "Contact" },
  ];

  readonly isMenuOpen = signal(false);
  readonly isScrolled = signal(false);
  readonly activeSectionId = signal("home");

  constructor() {
    // Wait for the first render so every section element exists.
    setTimeout(() => this.highlightSectionInView());
  }

  @HostListener("window:scroll")
  onScroll() {
    this.isScrolled.set(window.scrollY > 8);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  toggleMenu() {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  /** Marks the nav link of whichever section crosses the middle of the screen. */
  private highlightSectionInView() {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) this.activeSectionId.set(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    for (const sectionId of [
      "home",
      ...this.links.map((link) => link.sectionId),
    ]) {
      const section = document.getElementById(sectionId);
      if (section) observer.observe(section);
    }
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
