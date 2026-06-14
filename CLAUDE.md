# website-v2 — Joachim Demuth's personal portfolio

## What this is

Personal portfolio site for Joachim Demuth (Tech Lead, Copenhagen). Live at production via Vercel. Minimalist dark aesthetic — every design decision should reinforce that.

## Stack

- **Framework**: Next.js 16 (App Router) with React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 (imported via `@import "tailwindcss"` — not the old `tailwind.config.js` pattern)
- **Fonts**: Geist Sans + Geist Mono via `next/font/google`
- **Hosting**: Vercel (with Analytics + Speed Insights already wired in layout)
- **Dev command**: `npm run dev` — or `npm run dev-exp` for experimental HTTPS

## Branch workflow

- `staging` — development branch (work here)
- `main` — production branch (Vercel deploys from this)
- Always branch off `staging`, never commit directly to `main`

## Design system

**Non-negotiable**: strict minimalism. No decorations, no gradients in layout, no emojis, no heavy typography. Content carries the page.

### Color tokens (defined in `globals.css`, used via Tailwind)

| Variable     | Value     | Tailwind class         |
|--------------|-----------|------------------------|
| `--background` | `#0a0a0a` | `bg-background`        |
| `--foreground` | `#e5e5e5` | `text-foreground`      |
| `--muted`      | `#737373` | `text-muted`           |

### Typography

- Body text: `text-[15px] leading-relaxed text-muted`
- Section headings: `text-sm font-medium text-muted`
- Page titles: `text-2xl font-medium tracking-tight`
- Small metadata: `text-xs` or `text-sm tabular-nums text-muted/70`

### Animations

- Entrance: `animate-in` class + CSS custom property `--delay` (e.g. `style={{ "--delay": "100ms" }}`)
- Stagger sections at 100ms, 200ms, 300ms, 400ms increments
- View transitions: `<ViewTransition>` wraps children in layout; enabled via `experimental: { viewTransition: true }` in `next.config.ts`
- Respects `prefers-reduced-motion`

### Special effects

- **Film grain overlay**: subtle SVG fractalNoise on `body::before`, opacity 0.03 — do not remove
- **GradientText**: `<GradientText>` component animates per-letter color on hover. Colors cycle: `#818cf8 #60a5fa #34d399 #a78bfa #22d3ee`. **All links must use this component** — nav links, social links, inline links in body text, CTAs. Never use underline/color classes on links instead.
- **Tech tooltips**: `.tech-tooltip` CSS class shows label on hover above icon
- **Nav tooltip**: `.nav-tooltip` class shows "soon" below links that aren't ready yet

### Layout

- Max width `640px`, centered, `px-6 py-16 md:py-10`
- Nav: 5 links — home, projects, music, photos, notes — all using `<GradientText>`

## Pages & content model

### `/` — Home

- Bio + experience timeline (hardcoded in `app/page.tsx`)
- Live Spotify now-playing widget (compact, polls every 30s, only renders when something is playing)
- Social links: GitHub, X, LinkedIn, email

### `/projects` — Projects

- Data in `app/projects/data.ts` — add new projects here, newest first
- Each project has: `title`, `description`, `url`, `type`, optional `tech[]`
- Valid `type` values: `"Tool" | "Experiment" | "Side project" | "Open source" | "Template" | "Personal project" | "Work"`
- Tech icons: `nextjs | react | typescript | tailwind | python | supabase | openai | vercel | node | postgres | figma` — add new icons to `app/projects/tech-icon.tsx`
- Strings like `"Azure DevOps"` or `"CI/CD"` are accepted in `tech[]` but render no icon (no SVG defined)

### `/music` — Music

- Server component, `revalidate = 120` (2 minutes)
- Fetches from Spotify: top artists (short_term, 8), top tracks (short_term, 10), recently played (15)
- Artist images shown in grayscale, color on hover
- Now-playing widget at top polls `/api/spotify/now-playing` client-side every 30s
- Requires env vars: `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`

### `/photos` — Photos

- Data in `app/photos/data.ts` — add photos here, newest first
- Images go in `public/photos/`
- Each photo: `src`, `alt`, optional `aspect` (`"landscape" | "portrait" | "square"`), `camera`, `film`, `year`, `latlon`
- Masonry grid (2 cols mobile, 3 cols sm+), lightbox on click (Escape to close)
- Lightbox shows: alt, camera · film, GPS coords linking to Google Maps
- Cameras in use: Olympus OM-1, Olympus Mju I, Mamiya DSX 1000, Olympus AF 10, Sony RX100 VII, iPhone 11 Pro, iPhone 14 Pro

### `/notes` — Notes

- Data in `app/notes/data.ts` — add notes here, newest first
- Each note: `date` (YYYY-MM-DD), `content` (short — 1-2 sentences max), optional `link: { label, href }`
- Not a blog — keep them brief, conversational

## API

- `GET /api/spotify/now-playing` → `NowPlaying` JSON (`{ isPlaying: boolean, track: SpotifyTrack | null }`)

## Discogs integration

Library at `lib/discogs.ts`. Fetches the public collection for the configured username — no API key required. Rate limiter at `lib/rate-limit.ts` (8 req/60s, in-memory).

- Username: `DISCOGS_USERNAME` env var, defaults to `"demuth11"`
- Collection revalidates every 3600s (1 hour) — records don't change often
- Image domain `i.discogs.com` already whitelisted in `next.config.ts`
- `getCollection()` returns `VinylRecord[]` sorted by artist

## Spotify integration

Library at `lib/spotify.ts`. Uses refresh token flow — no user auth needed at runtime. All functions gracefully return empty/null on error.

Functions: `getNowPlaying()`, `getRecentlyPlayed(limit)`, `getTopTracks(timeRange, limit)`, `getTopArtists(timeRange, limit)`

## Content update patterns

**Adding a project**: edit `app/projects/data.ts`, prepend to the array.

**Adding a photo**: drop image in `public/photos/`, prepend entry to `app/photos/data.ts`.

**Adding a note**: prepend entry to `app/notes/data.ts`.

**Adding a tech icon**: add SVG path to `ICONS` in `app/projects/tech-icon.tsx`, add label to `LABELS`.

## Key constraints

- Never add heavy libraries — keep the bundle minimal
- No dark/light mode toggle — it's always dark
- No page-level loading spinners — use graceful empty states
- Image domains allowed: `i.scdn.co` (Spotify album art) — add others to `next.config.ts` `remotePatterns`
- `unoptimized` prop on Spotify album art images (external CDN, not Next.js optimized)
