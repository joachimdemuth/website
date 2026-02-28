import type { Tech } from "./tech-icon";

export type Project = {
  title: string;
  description: string;
  url: string;
  type: "Tool" | "Experiment" | "Side project" | "Open source" | "Template";
  tech?: Tech[];
};

// -------------------------------------------------------
// Add projects here. Newest first.
// -------------------------------------------------------

export const projects: Project[] = [
  // {
  //   title: "Project Name",
  //   description: "One-line description of what it does and why.",
  //   url: "https://example.com",
  //   type: "tool",
  // },
  {
    title: "Slaatto Morsbøl",
    description: "Website made for Slaatto Morsbøl, a Copenhagen based architecture studio.",
    url: "https://slaattomorsboel.dk",
    type: "Side project",
    tech: ["nextjs", "typescript", "tailwind", "vercel"],
  }
];
