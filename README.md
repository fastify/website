# Fastify Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Local Development

### Installation

```bash
npm install
```

### Setup

Before we start the development server we will need to fetch some of the docs from [Fastify Repo](https://github.com/fastify/fastify.git). This requires Github CLI to be installed which can be found [here](https://cli.github.com/).

After installing [GitHub CLI](https://cli.github.com/) ensure you are logged in by running;

```
gh auth login
```

Once Github CLI is setup you can proceed to run the build below command that will setup your project locally.

```bash
npm run build:website
```

The command will:

- Download all the Fastify's releases from GitHub
- Process each release to generate the versioned Docusaurus documentation
- Generate the static website

During this process:

- `versions.json` is generated when building the website

By running `npm run serve`, you will load locally the production build from the `/build` folder.

### Run

```bash
$ npm start
```

This command starts a local development server and opens up a browser window.  
Most changes are reflected live without having to restart the server.

Note that only the documentations listed in the `versions.json` file will be available.  
So, if you have a long version list, your local enviroment will be slowed down.

### Deployment

The website is deployed to GitHub pages using the `gh-pages` branch when a merge to `main` is done.

## Good to know

- Read [here](https://github.com/fastify/website/issues/32) for the specs
- If the markdown file from the main repo has a `# Title`, the title will be used as the sidebar label
- The `/docs/latest/` URL is implemented by a named version of the most recent version
- The `/docs/master/` URL is implemented by redirecting to the `/docs/latest/` URL
