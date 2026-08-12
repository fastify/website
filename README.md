# Fastify Website

A redesigned home for [Fastify](https://fastify.dev/) — a fast and low overhead
web framework for Node.js. Built with **Astro**, **Tailwind CSS v4**, **MDX**
content collections, and **Pagefind** for static full-text search.

The design language is a dark-first "telemetry" aesthetic built around the one
thing Fastify is known for: **speed**. The signature element is a live
requests-per-second velocity gauge in the hero.

## Stack

- [Astro](https://astro.build) — static site generator
- [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite`
- MDX + Astro Content Collections for docs
- [Pagefind](https://pagefind.app) — static, client-side search index
- Variable fonts: Space Grotesk (display), Inter (body), JetBrains Mono (code)

## Commands

| Command            | Action                                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `pnpm install`     | Install dependencies                                                                                                     |
| `pnpm run dev`     | Start the dev server at `localhost:4321`                                                                                 |
| `pnpm run build`   | Build to `dist/` and generate the Pagefind search index                                                                  |
| `pnpm run preview` | Preview the production build locally                                                                                     |
| `pnpm run lint`    | Lint with [Biome](https://biomejs.dev)                                                                                   |
| `pnpm run format`  | Format with Biome (`format` to verify)                                                                                   |
| `pnpm run check`   | Type-check via [`astro check`](https://docs.astro.build/en/reference/cli-reference/#astro-check) (run by CI on every PR) |

> Search only works against a production build (`npm run build`), because the
> Pagefind index is generated from the built HTML. In `dev` the search modal
> shows a graceful fallback message.
>
> Icons come from [Lucide](https://lucide.dev) (`@lucide/astro`). The GitHub
> star count is fetched client-side on page load so it always matches GitHub.
> Internal links respect Astro's `base` via the `withBase` helper in
> [src/lib/href.ts](src/lib/href.ts).

## Project structure

```
src/
  components/     UI: Nav, Footer, Search, VelocityMeter, CodeTabs, BenchBars…
  content/
    docs/         Documentation pages (md/mdx) — grouped by `section`
  data/site.ts    Central data: nav, features, sponsors, team, benchmarks, plugins
  layouts/        BaseLayout (chrome, theme, fonts)
  pages/          Routes: /, /ecosystem, /benchmarks, /organizations, /docs
  styles/         global.css — design tokens + prose styling
```

## Feature parity with the current site

This redesign preserves every user-facing capability of the current
Docusaurus site:

- Marketing homepage (hero, why, core features, quick start, benchmarks,
  ecosystem, team, CTA) with copy-to-clipboard code samples.
- **Ecosystem** page with client-side search + category filtering.
- **Benchmarks** page with animated comparison bars.
- **Organizations & team** page (production users, sponsors, maintainers).
- **Docs** with a sectioned sidebar, prev/next navigation, breadcrumbs, and
  full-text search.
- Dark/light theme toggle (no flash of unstyled theme), responsive nav with a
  mobile menu, keyboard-accessible focus states, reduced-motion support.

### Documentation pipeline

The documentation is **not** stored in this repository — it lives in the
[`fastify/fastify`](https://github.com/fastify/fastify) repo and is fetched at
build time by [`scripts/fetch-docs.mjs`](scripts/fetch-docs.mjs), which runs
automatically via the `prebuild`/`predev` npm hooks.

The script:

1. Lists all release tags with `git ls-remote` (no auth, no rate limit).
2. Selects releases exactly like the official `fastify/website` build:
   - the **current (highest) major** → the latest patch of **every minor**
     (e.g. all `5.x`);
   - **each older major** down to `DOCS_MIN_MAJOR` (default `3`) → only its
     **latest** release (e.g. the last `4.x` and the last `3.x`).
3. Downloads each release tarball and extracts only its `docs/` folder.
4. Transforms every Markdown file — strips the repeated centered title,
   rewrites relative `.md` links and resource paths to site URLs, and injects
   `title` / `section` / `order` / `version` frontmatter.
5. Emits versioned content into `src/content/docs/<version>/…`, copies image
   resources into `public/docs/<version>/…`, duplicates the newest release as
   `latest`, and writes `src/data/versions.json`.

The result is browsable, versioned docs (`latest`, `v5.10.x` … `v5.0.x`,
`v4.29.x`, `v3.29.x`) with a version switcher, exactly like the current website.
Fetched content is git-ignored so the source of truth stays in `fastify/fastify`.

**Version-scoped search:** the Pagefind index tags every doc page with its
version. When you search from a docs page, results are filtered to the selected
version only (searching from a `v5.10.x` page returns `v5.10.x` results, never
`v5.9.x` or `v4.x`); elsewhere search defaults to `latest`.

```bash
pnpm run fetch:docs             # fetch/refresh docs (skips already-fetched versions)
FORCE_FETCH=1 pnpm run fetch:docs   # force a refresh
DOCS_MIN_MAJOR=4 pnpm run fetch:docs # only fetch v4.x and newer
```

## Deployment

A GitHub Actions workflow ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml))
builds and publishes the site to **GitHub Pages** on every push to `main` (and
on manual dispatch). It installs dependencies with pnpm, fetches the docs, runs
`astro build` + Pagefind, and deploys the `dist/` output.

To enable it: in the repository settings, set **Settings → Pages → Build and
deployment → Source** to **GitHub Actions**.

> The site is configured for a **root** deployment (as used by `fastify.dev` via
> a custom domain). If you deploy to a project subpath
> (`https://<user>.github.io/<repo>/`), set Astro's
> [`base`](https://docs.astro.build/en/reference/configuration-reference/#base)
> and add a matching custom domain / `CNAME` accordingly.
