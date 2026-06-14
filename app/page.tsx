import { GradientText } from "./components/gradient-text";
import { NowPlayingCompact } from "./components/now-playing-compact";

const experience: { role: string; company: string; href: string | null; period: string }[] = [
  {
    role: "Tech Lead",
    company: "P-Secure",
    href: "https://www.p-secure.com",
    period: "2025 --",
  },
  {
    role: "Design Engineer",
    company: "P-Secure",
    href: "https://www.p-secure.com",
    period: "2024 -- 2025",
  },
  {
    role: "Product Designer",
    company: "Maybe Tomorrow",
    href: null,
    period: "2023 -- 2024",
  },
  {
    role: "Digital Designer",
    company: "VENZO",
    href: "https://venzo.com",
    period: "2022 -- 2023",
  },
  {
    role: "Digital Designer",
    company: "Telenor",
    href: "https://telenor.dk",
    period: "2021 -- 2022",
  },
  {
    role: "UX Design Student",
    company: "Telenor",
    href: "https://telenor.dk",
    period: "2020 -- 2021",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Joachim Demuth",
  jobTitle: "Tech Lead",
  url: "https://joachimdemuth.com",
  sameAs: [
    "https://github.com/joachimdemuth",
    "https://x.com/joachimdemuth",
    "https://linkedin.com/in/joachimdemuth",
  ],
  worksFor: {
    "@type": "Organization",
    name: "P-Secure",
    url: "https://p-secure.com",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Copenhagen",
    addressCountry: "DK",
  },
  email: "jdemuth18@gmail.com",
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-2xl font-medium tracking-tight">Joachim Demuth</h1>

      <div className="animate-in mt-8 space-y-4 text-[15px] leading-relaxed text-muted" style={{ "--delay": "100ms" } as React.CSSProperties}>
        <p>
          Tech Lead based in Copenhagen. At{" "}
          <a href="https://p-secure.com" target="_blank" rel="noopener noreferrer">
            <GradientText>P-Secure</GradientText>
          </a>
          {" "}I lead product and engineering — building the team and product
          behind automated background checks for companies in critical
          infrastructure.
        </p>
        <p>
          Started in design — a few years at Telenor and smaller studios —
          before moving into engineering. The two never really separated, and
          the best work happens when you don&apos;t let them.
        </p>
        <p>
          Outside work I build side projects, shoot film, and spend too much
          time looking for music.
        </p>
      </div>

      <section className="animate-in mt-16" style={{ "--delay": "200ms" } as React.CSSProperties}>
        <h2 className="text-sm font-medium text-muted">Experience</h2>
        <ul className="mt-6 space-y-4">
          {experience.map((item) => (
            <li key={`${item.company}-${item.period}`} className="flex items-baseline justify-between gap-4">
              <span className="text-[15px]">
                {item.role},{" "}
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    <GradientText>{item.company}</GradientText>
                  </a>
                ) : (
                  <span className="text-muted">{item.company}</span>
                )}
              </span>
              <span className="shrink-0 text-sm tabular-nums text-muted">
                {item.period}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="animate-in mt-16" style={{ "--delay": "300ms" } as React.CSSProperties}>
        <NowPlayingCompact />
      </div>

      <div className="animate-in mt-6 flex gap-6 text-sm text-muted" style={{ "--delay": "400ms" } as React.CSSProperties}>
        <a
          href="https://github.com/joachimdemuth"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GradientText>github</GradientText>
        </a>
        <a
          href="https://x.com/joachimdemuth"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GradientText>x</GradientText>
        </a>
        <a
          href="https://linkedin.com/in/joachimdemuth"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GradientText>linkedin</GradientText>
        </a>
        <a href="mailto:jdemuth18@gmail.com">
          <GradientText>email</GradientText>
        </a>
      </div>
    </main>
  );
}
