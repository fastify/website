// @ts-check

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

const u = require('./docusaurus.config.utils')

const versions = require('./versions.json')

const BASE_URL = process.env.BASE_URL ?? '/'

const isDev = process.env.NODE_ENV === 'development'
const latestMajorVersion = versions.find((v) => v.startsWith('v'))?.split('.')[0] || 'v4'

u.checkGeneratedData()

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Fastify',
  tagline: 'Fast and low overhead web framework, for Node.js',
  url: 'https://fastify.io',
  baseUrl: BASE_URL,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  organizationName: 'fastify',
  projectName: 'website',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // https://docusaurus.io/docs/using-plugins#using-presets
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        debug: true, // force debug plugin usage

        // https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#configuration
        docs: {
          editUrl: (editPage) => {
            // Users can not submit doc updates to the legacy versions!
            if (editPage.version !== 'latest' && !editPage.version.startsWith(latestMajorVersion)) {
              return undefined
            }

            // We want users to submit doc updates to the upstream/next version!
            return `https://github.com/fastify/fastify/edit/main/docs/${editPage.docPath}`
          },
          editCurrentVersion: false,
          sidebarPath: 'sidebar.js',
          showLastUpdateTime: true,
          breadcrumbs: true,
          includeCurrentVersion: isDev,
          versions: u.getVersionLabels(versions),
          onlyIncludeVersions: u.getVersionsIncluded({ versions, fastBuild: isDev }),
          sidebarItemsGenerator: require('./sidebar.js'),
        },

        // https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog#configuration
        blog: false,

        // https://docusaurus.io/docs/api/themes/@docusaurus/theme-classic
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'), //
            require.resolve('./src/css/ecosystem.css'), //
          ],
        },

        // https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-pages#configuration
        pages: {},

        // https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-sitemap#configuration
        sitemap: {
          ignorePatterns: ['/scripts/**'],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // https://docusaurus.io/docs/api/themes/configuration
      image: 'img/logos/fastify-black.svg',
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
      navbar: {
        title: 'Home',
        logo: {
          alt: 'Fastify Cheetah Logo',
          src: 'img/logos/fastify-black.svg',
          srcDark: 'img/logos/fastify-white.svg',
        },
        items: [
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'docsSidebar',
          //   position: 'left',
          //   label: 'Docs',
          // },
          {
            type: 'doc',
            docId: 'index',
            position: 'left',
            label: 'Docs',
          },
          { to: '/ecosystem', label: 'Ecosystem', position: 'left' },
          { to: '/benchmarks', label: 'Benchmarks', position: 'left' },
          { to: '/organisations', label: 'Adopters', position: 'left' },
          { to: '/contribute', label: 'Contribute', position: 'left' },
          {
            type: 'docsVersionDropdown',
            position: 'right',
          },
          // {
          //   type: 'localeDropdown',
          //   position: 'right',
          // },
          {
            href: 'https://github.com/fastify/website',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/latest/Guides/Getting-Started',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/fastify',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/fastify',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/fastifyjs',
              },
            ],
          },
          {
            title: 'More',
            items: [
              // {
              //   label: 'Blog',
              //   to: '/blog',
              // },
              {
                label: 'GitHub',
                href: 'https://github.com/fastify/website',
              },
            ],
          },
        ],
        copyright: `Fastify, Copyright © 2016-${new Date().getFullYear()} <a href="https://openjsf.org">OpenJS Foundation</a> and The Fastify team, Licensed under <a href="https://github.com/fastify/fastify/blob/main/LICENSE">MIT</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        magicComments: [
          {
            className: 'theme-code-block-highlighted-line',
            line: 'highlight-next-line',
            block: { start: 'highlight-start', end: 'highlight-end' },
          },
          {
            className: 'code-block-error-line',
            line: 'This will error',
          },
        ],
      },
    }),

  plugins: [
    '@orama/plugin-docusaurus',
    [
      // This plugin does not work in dev mode
      '@docusaurus/plugin-client-redirects',
      {
        createRedirects(existingPath) {
          // Legacy/Retro compatibility:

          // Redirect for old /docs/master/ URLs
          if (existingPath.startsWith('/docs/latest')) {
            return existingPath.replace('/docs/latest', '/docs/master')
          }

          // Redirect for old /docs/v3.<x>.<y>/ URLs to the latest v3 version
          if (existingPath.startsWith('/docs/v3')) {
            return u.manageRedirects({
              existingPath,
              major: '3',
              versions,
              versionsShipped: require('./versions-shipped.json'),
              ignore: ['/docs/v3.29.x/Reference/', '/docs/v3.29.x/Guides/'],
            })
          }

          // Redirect for old /docs/v2.<x>.<y>/ URLs to the latest v2 version
          if (existingPath.startsWith('/docs/v2')) {
            return u.manageRedirects({
              existingPath,
              major: '2',
              versions,
              versionsShipped: require('./versions-shipped.json'),
            })
          }

          return undefined
        },
      },
    ],
  ],
}

module.exports = config
