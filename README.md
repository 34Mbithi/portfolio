# Portfolio

Personal software engineer portfolio — a single-page scrolling site with anchor
navigation, built as a portfolio piece in its own right.

The main portfolio content is in place. Employer names, LinkedIn, résumé,
portrait, and project screenshots still need final assets or factual details.

## Tech stack

| Concern    | Choice                                             |
| ---------- | -------------------------------------------------- |
| Framework  | Vue 3 (SFCs, `<script setup>`)                     |
| Language   | TypeScript (strict)                                |
| Build tool | Vite                                               |
| Styling    | Tailwind CSS v4 (CSS-first config, no JS config)   |
| Hosting    | Vercel (zero-config static build)                  |

No UI kit, no icon package, no state library. The production bundle is
~39 kB of JavaScript and ~6 kB of CSS, gzipped.

## Getting started

Requires Node 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the URL Vite prints (default `http://localhost:5173`).

## Scripts

| Command              | Description                                        |
| -------------------- | -------------------------------------------------- |
| `npm run dev`        | Dev server with hot module replacement             |
| `npm run build`      | Type-check, then build to `dist/`                  |
| `npm run preview`    | Serve the production build locally                 |
| `npm run type-check` | Type-check only, without building                  |

`npm run build` runs `vue-tsc` first, so a type error fails the build rather
than shipping.

## Project structure

```
src/
├── App.vue                  Page composition + skip link
├── main.ts                  App entry
├── assets/
│   └── main.css             Design tokens, base styles, dark mode
├── components/
│   ├── layout/
│   │   ├── SiteHeader.vue   Sticky nav, scroll-spy, mobile menu
│   │   └── SiteFooter.vue
│   ├── sections/            One file per page section
│   │   ├── HeroSection.vue
│   │   ├── AboutSection.vue
│   │   ├── ProjectsSection.vue
│   │   ├── ExperienceSection.vue
│   │   ├── SkillsSection.vue
│   │   └── ContactSection.vue
│   └── ui/                  Reusable primitives
│       ├── BaseButton.vue
│       ├── IconGlyph.vue    Inline SVG icon set
│       ├── MediaFrame.vue   Image, or labelled placeholder
│       ├── ProjectCard.vue
│       ├── SectionShell.vue Shared section frame + heading
│       ├── SocialLinks.vue
│       ├── TagChip.vue
│       └── ThemeToggle.vue
├── composables/
│   ├── useTheme.ts          Dark mode state + persistence
│   └── useScrollSpy.ts      Active section tracking
├── directives/
│   └── reveal.ts            v-reveal scroll animation
├── data/
│   └── content.ts           ← ALL SITE CONTENT
├── types/
│   └── content.ts           Content type contracts
└── utils/
    └── scroll.ts            Smooth scroll + focus management
```

## Replacing the content

**Everything you need to edit is in [`src/data/content.ts`](src/data/content.ts).**
No layout file needs to be opened. Search the codebase for `TODO:` to find every
placeholder.

Start with the constants at the top of that file:

```ts
const NAME = 'Your Name'
const GITHUB_URL = 'https://github.com/your-handle'
const LINKEDIN_URL = 'https://linkedin.com/in/your-handle'
const EMAIL = 'you@example.com'
const RESUME_URL = '/resume.pdf'
```

Then work down through `hero`, `about`, `projects`, `experience`, `skills`, and
`contact`. The shapes are enforced by [`src/types/content.ts`](src/types/content.ts) —
if you misspell a field or forget a required one, `npm run type-check` tells you
exactly where.

### Assets to add

Drop these into `public/`. Anywhere an image is missing, the site renders a
labelled placeholder naming the file it expects, so nothing silently breaks.

| File                        | Used for                                    |
| --------------------------- | -------------------------------------------- |
| `resume.pdf`                | Résumé download link                        |
| `portrait.jpg`              | About section photo                         |
| `projects/<project-id>.png` | Project screenshots                         |
| `favicon.svg`               | Browser tab icon (a monogram is in place)   |

After adding an image, point the matching `src` in `content.ts` at it — e.g.
`src: '/portrait.jpg'`.

### Also update

- **`index.html`** — `<title>`, meta description, author, and Open Graph tags.
  These are what search results and link previews show; they are not wired to
  `content.ts` because they must exist in the HTML before JavaScript runs.

## Design system

Tailwind v4 is configured in CSS, not JavaScript. All tokens live in
[`src/assets/main.css`](src/assets/main.css).

**To change the accent colour, edit two lines** — `--accent` under `:root` and
under `.dark`. Everything else follows.

Colours are defined twice: raw values in `:root` / `.dark`, then mapped to
Tailwind names in an `@theme inline` block. That indirection is what lets
`bg-surface` work correctly in both themes without a single `dark:` class in any
component.

Typography uses two families (Inter, JetBrains Mono) loaded from Google Fonts in
`index.html`, and a fluid `clamp()` scale — headings resize with the viewport
rather than stepping at breakpoints.

## Motion

Motion is progressive enhancement and is switched off under
`prefers-reduced-motion: reduce`.

**Scroll reveal** ([`reveal.ts`](src/directives/reveal.ts)) — `v-reveal` fades
and lifts an element the first time it scrolls into view. Elements crossing the
threshold together are treated as one group and cascade 70ms apart in document
order, so a row of cards arrives one after another without any call site
numbering its own children. Pass a number (`v-reveal="140"`) to set a delay by
hand; that always wins over the automatic one.

Headings use the same reveal one word at a time, the header settles into place
one word at a time. Important actions share a CSS-only staggered glyph-roll
interaction, while project media and directional icons use restrained hover
movement. There is no animation runtime in the client bundle.

## Accessibility

Built in rather than retrofitted:

- Semantic landmarks (`header`, `main`, `nav`, `section`, `footer`) and a
  single `h1`, with heading levels never skipped
- "Skip to main content" link as the first tab stop
- Anchor navigation moves keyboard focus to the target section, not just the
  scroll position
- Visible focus ring on every interactive element
- `aria-current` on the active nav link, `aria-expanded` on the mobile menu
- All animation disabled under `prefers-reduced-motion: reduce`
- Text meets WCAG AA contrast in both themes

If you change the accent colour, re-check contrast — `--accent-strong` is the
variant used for text and must stay readable on `--surface`.

## Deploying to Vercel

1. Push to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel detects Vite automatically. The defaults are correct:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Deploy.

No `vercel.json` is needed for a static Vite build.

Pushes to `main` become production deploys; pushes to `development` and pull
requests get their own preview URLs.

## Branches

- `main` — stable and deployable; this is what Vercel serves in production.
- `development` — active work. Branch features off here and merge back.

## Notes

- **TypeScript is pinned to `~5.9`.** TypeScript 7 (the Go-native port) does not
  expose the `./lib/tsc` subpath that `vue-tsc` depends on. Do not bump it past
  5.x until `vue-tsc` supports TS 7.
- Fonts are loaded from Google Fonts. Self-hosting them would remove a
  third-party request and improve privacy — a reasonable follow-up.

## License

Not yet specified.
