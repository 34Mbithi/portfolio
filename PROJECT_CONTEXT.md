# Portfolio Website — Project Context for ChatGPT

Use the following as background context when helping me improve this project. Do not assume that missing assets or placeholder values are finished. Ask before changing factual claims about my work history, skills, or project results.

## Project overview

This is the personal portfolio of **Mbithi Evans**, a full-stack developer based in Nairobi, Kenya and open to remote work. The site is intended to support applications for full-stack and backend roles while also presenting Mbithi as available for code-review and AI coding-evaluation work.

The central positioning statement is:

> Full-stack developer building REST APIs and the interfaces on top of them.

The portfolio emphasizes practical engineering evidence rather than generic marketing language. Its project section is built around detailed case studies—Problem, Solution, Result—and measurable outcomes. The content especially highlights API design, authentication, validation, database modelling, testing, reusable frontend architecture, reproducible environments, and the boundary between backend responses and frontend state.

## Current status

The website is a working, responsive single-page application. The TypeScript checks and production build currently pass. It is on the `development` branch and has substantial uncommitted improvements beyond the first committed version.

The application code and most written content are implemented. Several launch assets and a few factual placeholders are still missing; these are listed under “Incomplete items.”

## Technology stack

- Vue 3 using Single File Components and `<script setup>`
- TypeScript in strict mode
- Vite 8
- Tailwind CSS 4 using CSS-first configuration
- Plain Vue composables for shared behavior
- Static deployment intended for Vercel
- Google Fonts: Inter for general text and JetBrains Mono for labels/technical details
- No component library, icon package, router, state-management package, or animation library

The site is intentionally lightweight. The current production output is approximately 110 kB JavaScript and 36 kB CSS before gzip, or approximately 42 kB JavaScript and 7 kB CSS after gzip.

## Information architecture

The page is composed in this order:

1. Fixed header and navigation
2. Hero
3. Selected Projects
4. Experience
5. About
6. Skills
7. Contact
8. Editorial footer

The header links to About, Projects, Experience, Skills, and Contact. It uses scroll-spy behavior to show the active section. On mobile, navigation opens in a dropdown panel and locks background scrolling. The header also contains a persistent light/dark theme toggle.

## Visual direction

The current design is minimal, technical, editorial, and professional rather than flashy. Its visual system includes:

- A very light cool canvas in light mode and deep blue-black surfaces in dark mode
- A teal accent color in both themes
- Generous whitespace and a wide but capped page container
- Comfortable maximum line lengths for prose
- Large fluid headings that resize with `clamp()`
- Monospaced section numbers, metadata, and technical labels
- Alternating tinted and untinted page sections
- Fine borders, lightly raised cards, restrained shadows, and subtle hover movement
- A faint dot grid and soft teal glow behind the hero
- Responsive layouts that become single-column on small screens

The aesthetic should remain clean and credible for technical recruiters and engineering managers. Improvements should preserve readability and avoid turning it into a visually noisy agency-style portfolio.

## Current content

### Hero

- Availability label: “Available for new work”
- Name: Mbithi Evans
- Headline: “Full-stack developer building REST APIs and the interfaces on top of them.”
- Summary: Mbithi works with Laravel and Flask on the server and Vue and React in the browser, with particular attention to request validation, authentication, and useful API response shapes.
- Location: Nairobi, Kenya; remote-friendly
- Target roles: full-stack and backend
- Primary calls to action: “View Projects” and “Contact Me”
- A right-hand “at a glance” panel summarizes location, server stack, client stack, and desired roles.

### About

The About section describes:

- Training at Moringa School
- A Business Information Technology degree from JKUAT
- A preference for building APIs and the frontend applications that consume them
- Systems-integration support experience involving requirements validation, issue reproduction, and precise technical reporting
- Earlier ICT technician experience involving Docker, backups, permissions, databases, troubleshooting, and downtime
- An interest in backend/full-stack employment, code review, and AI coding evaluation

A portrait is designed to appear in a sticky right-hand frame on larger screens, but the actual image has not yet been added.

### Projects

There are four selected projects. Each project card includes a title, tagline, technology chips, Problem/Solution/Result narrative, three outcome metrics, a screenshot area, and available repository/demo links. Project card media alternates sides on wide screens.

#### 1. Versioned Product REST API

- Laravel 12 API using PHP, Sanctum, Pest, Spatie Query Builder, and SQLite
- Uses DTOs for validation, single-purpose Action classes, a ProductPolicy for authorization, API Resources for response shaping, and allowlisted filtering/sorting
- Stated evidence: 26 Pest tests, 154 assertions, 9 `/api/v1` endpoints, and 5 allowlisted sort fields
- Repository: `https://github.com/34Mbithi/BACKENDTECHNICALTEST`
- No live demo

#### 2. Product Management Dashboard

- Vue 3 admin interface using Pinia, Vue Router, Tailwind CSS, Vite, and Axios
- Uses five reusable form controls, a shared Axios service, domain-specific stores, a global auth guard, and one reusable destructive-action confirmation modal
- Stated evidence: 9 routes, 8 guarded routes, 5 Pinia stores, and 5 reusable input components
- Live demo: `https://34mbithi.github.io/product-management/`
- Repository: `https://github.com/34Mbithi/product-management`

#### 3. InkSpace

- Full-stack blogging project with a Flask/JWT/PostgreSQL backend and React client
- Explicit many-to-many post/category modelling, cascade rules, model-level username/email validation, password hashing, JWT protection on write operations, pagination, and seed scripts
- Stated evidence: 4 route modules, 4 cascade-safe models, and JWT protection on all write paths
- Repository currently points to the backend: `https://github.com/34Mbithi/InkSpaceBackend`
- No live demo

#### 4. Late Show API

- Flask, Flask-SQLAlchemy, Flask-Migrate, SQLite, and Python
- Focuses on model-level 1–5 rating validation, useful 400 responses for invalid writes, safe relationship cascades, and reproducible migrations
- Stated evidence: a model-enforced 1–5 range, 3 related cascade-safe models, and HTTP 400 rather than 500 for malformed writes
- Repository: `https://github.com/34Mbithi/lateshow`
- No live demo

The quantitative claims in these case studies are intended to be verifiable from the repositories and should not be invented or inflated when editing the copy.

### Experience

There are two timeline entries:

1. **Software Developer Intern — Systems Integration Support**, June 2025 to September 2025, remote/Nairobi. The entry discusses Sitecore CMS integration support, Agile/Scrum work, validation against requirements, SCTD system testing against government compliance requirements, AWS RDS snapshot-migration analysis, and reproducible integration-issue reporting. The employer name is still a placeholder.
2. **ICT / System Technician**, January 2025 to May 2025, Nairobi. The entry discusses installing and maintaining systems, user and network support, remote diagnosis, databases and backups, permissions/security controls, Docker, and virtual machines. The employer name is still a placeholder.

The experience timeline can link an entry directly to a related project card. A `current` flag is supported and displays a live pulsing timeline node, though neither current entry uses it.

### Skills

Skills are grouped by purpose rather than displayed as one flat keyword list:

- Languages: JavaScript, TypeScript, Python, PHP, SQL, HTML5, CSS3
- Frontend: Vue 3, React, Pinia, Vue Router, Tailwind CSS, Vite
- Backend and APIs: Laravel, Flask, Node.js, Express, REST APIs, Sanctum/JWT, Pest
- Databases: PostgreSQL, MySQL, SQLite, SQLAlchemy, Eloquent, Flask-Migrate
- Tools and platforms: Git/GitHub, Docker, Postman, GitHub Actions, Vercel, Linux, Chrome DevTools
- Currently learning: automated testing at scale, CI/CD pipelines, and system-design fundamentals

### Contact

The contact section invites full-stack/backend opportunities plus code-review and AI coding-evaluation work. The primary contact is `mbithienzioka2019@gmail.com`. It states availability for remote work or work in Nairobi, Kenya.

Social links exist for GitHub, LinkedIn, email, and résumé. GitHub currently points to `https://github.com/34Mbithi`.

## Current functionality and interaction

- Fixed responsive header
- Desktop and mobile anchor navigation
- Active-section scroll spy
- Smooth scrolling with focus moved to the destination for keyboard users
- Light/dark theme toggle with localStorage persistence
- Theme initialized before the app mounts to prevent a flash of the wrong color scheme
- One-time scroll reveals using IntersectionObserver
- Automatic stagger for groups entering the viewport together
- Word-by-word reveals for major headings
- Reusable staggered glyph-roll labels on primary actions and footer links
- Small card, media, button, and icon hover effects
- Direct project links from related experience items
- Labelled image placeholders when assets are missing, so missing media does not break layouts

Motion is progressive enhancement. It is disabled when the visitor has enabled `prefers-reduced-motion`.

## Accessibility already implemented

- Semantic header, nav, main, sections, footer, articles, lists, and timeline structure
- One main `h1` and logical heading hierarchy
- “Skip to main content” as the first keyboard-accessible link
- Visible focus styles
- Keyboard focus management after in-page navigation
- ARIA labels on controls and project tech lists
- `aria-current` for active navigation
- `aria-expanded` and `aria-controls` for the mobile menu
- Escape-key handling for the mobile menu
- Reduced-motion support
- Screen-reader handling for headings that are visually split into animated words
- Image alt text is already drafted for all intended images
- Light and dark color tokens were designed for readable contrast

## Code organization

- `src/App.vue`: overall page composition and skip link
- `src/data/content.ts`: all editable portfolio copy, URLs, projects, experience, skills, and contact information
- `src/types/content.ts`: strict TypeScript contracts for the content model
- `src/components/sections/`: one Vue component per page section
- `src/components/layout/`: header and footer
- `src/components/ui/`: reusable buttons, tags, media frames, project cards, icons, theme toggle, social links, section shell, and boot overlay
- `src/composables/`: theme state and scroll spy
- `src/directives/reveal.ts`: element and heading reveal behavior
- `src/utils/scroll.ts`: accessible smooth scrolling and focus management
- `src/assets/main.css`: Tailwind import, design tokens, light/dark color values, global layout utilities, and animation CSS
- `index.html`: page title, SEO description, Open Graph metadata, fonts, favicon, and pre-mount theme initialization
- `public/`: static assets; currently includes the initials favicon and generated Open Graph card

All regular content changes should normally be made in `src/data/content.ts`; component edits should be reserved for layout or behavioral changes. SEO and social-sharing metadata must be changed in `index.html` because it needs to exist before Vue loads.

## Incomplete items

The following must be treated as unfinished:

- Add the real LinkedIn profile URL (the link is hidden until supplied)
- Add `public/resume.pdf`
- Add `public/portrait.jpg` and connect it in the content data
- Add four project images under `public/projects/`
- Replace the placeholder favicon/monogram if a final personal mark is desired
- Replace “Company Name” and “Previous Company” with the real employer names
- Confirm the final production domain and update the Open Graph URL
- Confirm whether Vercel is still the intended deployment platform, because the metadata currently contains a GitHub Pages URL
- Verify all project claims, dates, links, wording, and current-learning items before launch
- Consider self-hosting fonts to remove the Google Fonts request and improve privacy
- Add a license if the repository is meant to be publicly reusable

There is no contact form, CMS, backend, analytics, blog, automated test suite for this portfolio itself, or internationalization. Contact is intentionally email-based. Do not assume those features are required unless a requested improvement benefits from them.

## Important constraints for future changes

- Keep the site data-driven and preserve `src/data/content.ts` as the main editing surface.
- Preserve strict TypeScript and keep `npm run build` passing.
- Preserve responsive behavior, dark mode, keyboard access, focus handling, and reduced-motion support.
- Do not invent employers, job dates, project metrics, testimonials, client names, or technical results.
- Do not remove the detailed case-study format unless there is a strong reason; it is the main differentiator of the portfolio.
- Prefer lightweight Vue/CSS solutions over adding large dependencies.
- Keep the visual language restrained, technical, polished, and recruiter-friendly.
- Treat the current user-authored/uncommitted changes as valuable work; do not overwrite unrelated code.
- When proposing improvements, distinguish between content/branding improvements, UX/design improvements, technical improvements, and launch/SEO tasks.

## Useful commands

```bash
npm install
npm run dev
npm run type-check
npm run build
npm run preview
```

Node.js 20.19+ or 22.12+ is required.

## How I want ChatGPT to help

When I ask for a change, first identify the relevant files and explain any important tradeoffs. Make changes consistent with the existing design system and architecture. If a request depends on missing personal facts or assets, tell me exactly what is needed rather than inventing it. After code changes, run the appropriate type-check/build and summarize what changed, what was verified, and anything still incomplete.
