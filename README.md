# Docusaurus demo site

This website is meant to be a demo for a proposed overhaul to the Fastify docs using Docusaurus.

## About

This project is currently run in docs-only mode, bypassing Docusaurus' ability to serve statically-rendered react pages (ex. for a home page or similar). As such, the `src` directory serves no purpose other than providing a convenient way for us to test that feature.

This demo serves documentation from the `docs` directory, with each markdown file representing a page.

Due to this being a docs-only demo, it uses `/docs` as the base path. ex. when running in development mode use `http://localhost:3000/docs` to access the demo.

### Installation

```
npm install
```

### Local Development

```
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.
