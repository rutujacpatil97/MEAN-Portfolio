export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
}

/** One stop of the career timeline: a job or a school. */
export interface JourneyStop {
  kind: "edu" | "work";
  station?: string; // employer name (jobs only)
  place?: string; // school name (education) or the full employer description (jobs)
  title: string; // role or degree
  period: string; // e.g. "Dec 2024 – Aug 2026"
  points: string[];
  short?: string; // optional short name shown on the station sign
}

export interface ProjectLink {
  label: string;
  url: string;
}

/** One layer of a project's architecture, e.g. Angular -> Express -> MongoDB. */
export interface ArchitectureLayer {
  name: string;
  detail: string;
}

export interface Project {
  name: string;
  desc: string;
  stack: string; // comma separated technologies
  links?: ProjectLink[];
  architecture?: ArchitectureLayer[]; // optional; MEAN projects get a default flow if missing
}

export interface Award {
  title: string;
  note: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  summary: string;
  contact: ContactInfo;
  skills: Record<string, string[]>;
  journey: JourneyStop[];
  projects: Project[];
  awards: Award[];
}

/** A journey stop prepared for display on the train line. */
export interface JourneyStopView extends JourneyStop {
  organisation: string;
  shortName: string;
  dateDigits: string; // value for the seven-segment display, e.g. "12.2024-08.2026"
}
