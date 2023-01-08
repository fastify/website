# Fastify Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```bash
npm install
npm --prefix ./scripts install
```

### Local Development

```bash
$ npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
npm run build:website
```

- `versions.json` is generated when building the website

```bash
npm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

The website is deployed to GitHub pages using the `gh-pages` branch when a merge to `main` is done.

## Good to know

- Read [here](https://github.com/fastify/website-next/issues/32) for the specs
- If the markdown file from the main repo has a `# Title`, the title will be used as the sidebar label
- The `latest` version is just a renamed copy of the most recent version. This is done to support legacy links to the `/latest/*`
