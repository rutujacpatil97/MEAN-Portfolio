import { ArchitectureLayer, Project } from "../../core/profile.model";

export type ProjectCategory = "MEAN" | "Insurance";

/** A project prepared for display as a ticket. */
export interface ProjectTicket extends Project {
  number: string; // "01", "02", ...
  technologies: string[];
  categories: ProjectCategory[];
  routeFrom: string; // left end of the ticket's route line
  routeTo: string; // right end of the route line
  layers: ArchitectureLayer[];
}

// Shown for MEAN projects that do not define their own architecture in the data.
const DEFAULT_MEAN_LAYERS: ArchitectureLayer[] = [
  {
    name: "Angular",
    detail:
      "Single-page app: components, routing, forms and client-side state.",
  },
  {
    name: "Express",
    detail: "REST API: routes, validation, authentication and role checks.",
  },
  { name: "MongoDB", detail: "Database: stores users and application data." },
];

const INSURANCE_WORDS = /insurance|quote|premium|policy|endorsement|add-on/i;

function usesAnyOf(technologies: string[], ...names: string[]): boolean {
  const lowerCased = technologies.map((technology) => technology.toLowerCase());
  return names.some((name) => lowerCased.includes(name.toLowerCase()));
}

export function toProjectTicket(
  project: Project,
  index: number,
): ProjectTicket {
  const technologies = project.stack
    .split(",")
    .map((technology) => technology.trim());
  const isMeanStack =
    usesAnyOf(technologies, "Angular") &&
    usesAnyOf(technologies, "Node.js", "Express") &&
    usesAnyOf(technologies, "MongoDB");
  const isInsurance = INSURANCE_WORDS.test(`${project.name} ${project.desc}`);

  const categories: ProjectCategory[] = [];
  if (isMeanStack) categories.push("MEAN");
  if (isInsurance) categories.push("Insurance");

  return {
    ...project,
    number: (index + 1).toString().padStart(2, "0"),
    technologies,
    categories,
    routeFrom: isMeanStack ? "FULL STACK" : "FRONT-END",
    routeTo: project.links?.length
      ? "LIVE ON THE WEB"
      : isInsurance
        ? "INSURANCE"
        : "PORTFOLIO",
    layers: project.architecture ?? (isMeanStack ? DEFAULT_MEAN_LAYERS : []),
  };
}
