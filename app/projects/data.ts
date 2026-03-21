import type { Tech } from "./tech-icon";

export type Project = {
  title: string;
  description: string;
  url: string;
  type: "Tool" | "Experiment" | "Side project" | "Open source" | "Template" | "Personal project" | "Work";
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
    title: "P-Secure",
    description: "Automated background checks for companies working in critical infrastructure.",
    url: "https://p-secure.com",
    type: "Work",
    tech: ["nextjs", "typescript", "tailwind", "Azure DevOps", "CI/CD"],
  },
  {
    title: "Should i buy this vinyl?",
    description: "A LLM based app for vinyl newbies to help them decide if they should buy a vinyl record.",
    url: "https://shouldibuythisvinyl.com",
    type: "Personal project",
    tech: ["nextjs", "typescript", "tailwind", "vercel", "openai"],
  },
  {
    title: "Slaatto Morsbøl",
    description: "Website made for Slaatto Morsbøl, a Copenhagen based architecture studio.",
    url: "https://slaattomorsboel.dk",
    type: "Side project",
    tech: ["nextjs", "typescript", "tailwind", "vercel", "figma"],
  }
];
