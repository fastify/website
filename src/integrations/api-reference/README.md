# API reference

Pages for every typed export of `fastify`, the official `@fastify/*` plugins and the libraries of the Fastify team, generated from the type definitions published on npm. They use the site's layout (`BaseLayout.astro`) and CSS variables, so a theme change applies to them too.

| Route | Page |
|---|---|
| `/api/` | packages by category, with filters |
| `/api/decorations/` | what each plugin adds to `fastify`, `request` and `reply` |
| `/api/<package>/<export>/` | one export: signature, members, JSDoc, links |

## How it works

1. `scripts/postinstall.mjs` installs the packages into `.cache/api` (`install.js`; the plugin list is the "Core" section of the Ecosystem guide) and resolves the source links (`sources.js`).
2. `extract/` reads their `.d.ts` files with the TypeScript compiler and turns each export into a JSON doc.
3. `index.js` registers the routes; `pages/` and `components/` render them.

## Local development

The reference adds ~90 npm packages and ~750 pages. To leave it out:

```bash
SKIP_API_REFERENCE=1 npm run build:data
SKIP_API_REFERENCE=1 npm run dev
```

## Files

- `index.js`: the Astro integration (routes, options)
- `install.js`: which packages are documented (`LIBRARIES`, `EXTRA_PLUGINS`, `EXCLUDED`)
- `data.js`: docs index, links, categories, icons
- `sources.js`: links to the source on GitHub at the released tag
- `examples.js`: TypeScript / JavaScript versions of `@example` blocks
- `markdown.js`: JSDoc Markdown rendering
- `styles.css`: `far-` classes built on the site's CSS variables
- `extract/`: extraction pipeline on the TypeScript compiler API
