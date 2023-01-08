// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

const versions = require('./versions.json')

const BASE_URL = process.env.BASE_URL || '/'

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Fastify',
  tagline: 'Fast and low overhead web framework, for Node.js',
  url: 'https://fastify.io',
  baseUrl: BASE_URL,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  organizationName: 'fastify', // Usually your GitHub org/user name.
  projectName: 'website-next', // Usually your repo name.

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
        // https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#configuration
        docs: {
          editUrl: 'https://github.com/fastify/website-next/edit/main/docs/',
          editCurrentVersion: true,
          sidebarPath: 'sidebar.js',
          showLastUpdateTime: true,
          breadcrumbs: true,
          includeCurrentVersion: false,
          versions: {
            [versions[0]]: {
              path: 'latest',
              label: `latest (${versions[1]})`,
            },
            [versions[1]]: {
              banner: 'none',
            },
          },
          sidebarItemsGenerator: require('./sidebar.js'),
        },

        // https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog#configuration
        blog: false,

        // https://docusaurus.io/docs/api/themes/@docusaurus/theme-classic
        theme: {
          customCss: [require.resolve('./src/css/custom.css'), require.resolve('./src/css/ecosystem.css')],
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
      image: 'img/logos/fastify-black.png',
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
      navbar: {
        title: 'Home',
        logo: {
          alt: 'Fastify Cheetah Logo',
          src: 'img/logos/fastify-black.png',
          srcDark: 'img/logos/fastify-white.png',
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
          {
            type: 'docsVersionDropdown',
            position: 'right',
          },
          // {
          //   type: 'localeDropdown',
          //   position: 'right',
          // },
          {
            href: 'https://github.com/fastify/website-next',
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
                label: 'Tutorial',
                to: '/docs/intro',
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
                href: 'https://github.com/fastify/website-next',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
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
      algolia: {
        appId: 'DMPMC33PLU',
        apiKey: '12d46b3bfeee6511031cfe00778f3e45',
        indexName: 'fastify',
      },
    }),
}

module.exports = config
