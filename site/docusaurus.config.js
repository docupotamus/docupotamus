// @ts-check

const npm2yarn = require('@docusaurus/remark-plugin-npm2yarn');
const syntaxThemeDark = require('prism-react-renderer/themes/dracula');
const syntaxThemeLight = require('prism-react-renderer/themes/github');

/** @type {string} */
const REPOSITORY_URL = 'https://github.com/docupotamus/docupotamus';

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Docupotamus',
    tagline: 'A productivity suite of Docusaurus plugins',
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
                    editUrl: `${REPOSITORY_URL}/edit/main/site/`,
                    remarkPlugins: [
                        [
                            npm2yarn,
                            {
                                sync: true,
                            },
                        ],
                    ],
                    sidebarPath: require.resolve('./sidebars.js'),
                },
                blog: {
                    path: 'blogs',
                    routeBasePath: '/blogs',
                    editUrl: `${REPOSITORY_URL}/edit/main/site/`,
                    showReadingTime: true,
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: 'Docupotamus',
                logo: {
                    alt: 'Logo',
                    src: 'img/logo.svg',
                },
                items: [
                    {
                        type: 'docSidebar',
                        label: 'Docs',
                        position: 'left',
                        sidebarId: 'userGuide',
                    },
                    {
                        label: 'Blog',
                        to: '/blogs',
                        position: 'left',
                    },
                    {
                        type: 'docSidebar',
                        label: 'Developer Guide',
                        position: 'right',
                        sidebarId: 'developerGuide',
                    },
                    {
                        label: 'GitHub',
                        href: REPOSITORY_URL,
                        position: 'right',
                    },
                ],
                hideOnScroll: true,
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
