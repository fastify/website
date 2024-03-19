# Fastify Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Local Development

### Installation

```bash
npm install
npm --prefix ./scripts install
```

### Run

```bash
$ npm start
```

This command starts a local development server and opens up a browser window.  
Most changes are reflected live without having to restart the server.

Note that only the documentations listed in the `versions.json` file will be available.  
So, if you have a long version list, your local environment will be slowed down.

### Build

To run the build locally, you need [GitHub CLI](https://cli.github.com/) installed.  
The following command will:

- Download all the Fastify's releases from GitHub
- Process each release to generate the versioned Docusaurus documentation
- Generate the static website

```bash
npm run build:website
```

During this process:

- `versions.json` is generated when building the website

By running `npm run serve`, you will load locally the production build from the `/build` folder.

### Deployment

The website is deployed to GitHub pages using the `gh-pages` branch when a merge to `main` is done.

## Good to know

- Read [here](https://github.com/fastify/website/issues/32) for the specs
- If the markdown file from the main repo has a `# Title`, the title will be used as the sidebar label
- The `/docs/latest/` URL is implemented by a named version of the most recent version
- The `/docs/master/` URL is implemented by redirecting to the `/docs/latest/` URL
