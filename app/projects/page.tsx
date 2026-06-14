import type { Metadata } from "next";
import { GradientText } from "../components/gradient-text";
import { projects } from "./data";
import { TechIcon } from "./tech-icon";

export const metadata: Metadata = {
  title: "Projects - Joachim Demuth",
  description: "Things I've built.",
};

export default function Projects() {
  return (
    <main>
      <div className="animate-in">
        <h1 className="text-2xl font-medium tracking-tight">Projects</h1>
        <p className="mt-3 text-[15px] text-muted">
          Things I build, mostly to learn something new.
        </p>
      </div>

      {projects.length === 0 ? (
        <p
          className="animate-in mt-8 text-[15px] text-muted"
          style={{ "--delay": "100ms" } as React.CSSProperties}
        >
          Nothing here yet.
        </p>
      ) : (
        <ul className="mt-10 space-y-10">
          {projects.map((project, i) => (
            <li
              key={project.title}
              className="animate-in"
              style={{ "--delay": `${100 + i * 80}ms` } as React.CSSProperties}
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group -mx-3 block rounded-md px-3 py-3 transition-colors duration-200 hover:bg-white/3"
              >
                <span className="text-xs text-muted/50">{project.type}</span>
                <h2 className="mt-1 text-[15px] font-medium transition-colors group-hover:text-foreground">{project.title}</h2>
                <p className="mt-1 text-[15px] leading-relaxed text-muted">
                  {project.description}
                </p>
                {project.tech && project.tech.length > 0 && (
                  <div className="mt-2 flex gap-2 text-muted/40">
                    {project.tech.map((t) => (
                      <TechIcon key={t} name={t} />
                    ))}
                  </div>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}

      <div className="animate-in mt-16 border-t border-white/5 pt-10" style={{ "--delay": "500ms" } as React.CSSProperties}>
        <p className="text-[15px] text-muted">
          Have something you want to build?{" "}
          <a href="mailto:jdemuth18@gmail.com">
            <GradientText>Get in touch.</GradientText>
          </a>
        </p>
      </div>
    </main>
  );
}
