# Portfolio

Personal software engineer portfolio — a single-page scrolling site with anchor
navigation, built as a portfolio piece in its own right.

> **Status:** repository scaffold. The application itself is built on the
> `development` branch.

## Tech stack

| Concern    | Choice                                    |
| ---------- | ----------------------------------------- |
| Framework  | Vue 3 (`<script setup>`, SFCs)            |
| Language   | TypeScript                                |
| Build tool | Vite                                      |
| Styling    | _decided on `development`_                |
| Hosting    | Vercel (zero-config static build)         |

## Getting started

```bash
npm install
npm run dev
```

The dev server prints a local URL (default `http://localhost:5173`).

## Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR       |
| `npm run build`   | Type-check and build to `dist/`          |
| `npm run preview` | Serve the production build locally       |

## Branches

- `main` — stable, deployable. This is what Vercel serves in production.
- `development` — active work. Branch feature work off here and merge back.

## Deploying to Vercel

1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel detects Vite automatically — the defaults are correct:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Deploy. Every push to `main` triggers a production deploy; pushes to
   `development` and pull requests get their own preview URLs.

No `vercel.json` is required for a static Vite build.

## License

Not yet specified.
