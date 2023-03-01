// @ts-check

const npm2yarn = require('@docusaurus/remark-plugin-npm2yarn');
const syntaxThemeDark = require('prism-react-renderer/themes/dracula');
const syntaxThemeLight = require('prism-react-renderer/themes/github');

/** @type {string} */
const REPOSITORY_URL = 'https://github.com/dnguyen0304/docupotamus-site';

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Docupotamus',
    tagline: 'The fastest docs platform',
    url: 'https://docupotamus.io',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',

    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            '@docupotamus/docusaurus-preset-classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    editUrl: REPOSITORY_URL,
                    remarkPlugins: [
                        [
                            npm2yarn,
                            {
                                sync: true,
                            },
                        ],
                    ],
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: 'Home',
                logo: {
                    alt: 'Logo',
                    src: 'img/logo.svg',
                },
                items: [
                    {
                        type: 'doc',
                        label: 'Docs',
                        position: 'left',
                        docId: 'intro',
                    },
                    {
                        label: 'GitHub',
                        href: REPOSITORY_URL,
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                copyright: `Copyright © ${new Date().getFullYear()} Docupotamus, Inc.`,
            },
            prism: {
                theme: syntaxThemeLight,
                darkTheme: syntaxThemeDark,
            },
        }),
};

module.exports = config;
