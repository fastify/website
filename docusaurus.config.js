// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Fastify',
  tagline: 'Fast and low overhead web framework, for Node.js',
  url: 'https://fastify.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'fastify', // Usually your GitHub org/user name.
  projectName: 'website-next', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/fastify/website-next/edit/main/docs/',
          lastVersion: "current",
          versions: {
            current: {
              label: "v3.x (Current)",
              path: "v3",
            },
            "v2": {
              label: "v2.x",
              path: "v2",
            },
            "v1": {
              label: "v1.x",
              path: "v1",
            },
          },
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/fastify/website-next/edit/main/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: 'Fastify',
          src: 'img/fastify-logo-black.png',
          srcDark: 'img/fastify-logo-white.png',
        },
        items: [
          {
            type: "docsVersionDropdown",
            position: "left"
          },
          {
            type: "doc",
            docId: "index",
            position: "left",
            label: "Docs",
          },
          {to: '/ecosystem', label: 'Ecosystem', position: 'left'},
          {to: '/benchmarks', label: 'Benchmarks', position: 'left'},
          {to: '/contribute', label: 'Contribute', position: 'left'},
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/fastify/help',
            label: 'Help',
            position: 'left',
          },
          {
            href: 'https://github.com/fastify/fastify',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://twitter.com/fastifyjs',
            label: 'Twitter',
            position: 'right',
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
                label: 'Docs',
                to: '/docs/v3/',
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
                href: 'https://discord.gg/D3FZYPy',
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
              {
                label: 'Blog',
                href: 'https://medium.com/@fastifyjs',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/fastify/fastify',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} No One. This is a demo website.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
