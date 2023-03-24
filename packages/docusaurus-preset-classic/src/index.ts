import type {
    LoadContext,
    PluginConfig,
    PluginOptions,
    Preset
} from '@docusaurus/types';
import type { Options, ThemeConfig } from './options';
import resolveTheme from './options-resolvers/theme';

function makePluginConfig(
    source: string,
    options?: PluginOptions,
): string | [string, PluginOptions] {
    if (options) {
        return [require.resolve(source), options];
    }
    return require.resolve(source);
};

export default function preset(
    context: LoadContext,
    opts: Options = {},
): Preset {
    const { siteConfig } = context;
    const { themeConfig } = siteConfig;
    const { algolia } = themeConfig as Partial<ThemeConfig>;
    const isProd = process.env.NODE_ENV === 'production';
    const {
        debug,
        docs,
        blog,
        pages,
        sitemap,
        theme,
        googleAnalytics,
        gtag,
        zen,
        ...rest
    } = opts;

    const themes: PluginConfig[] = [];
    themes.push(
        // TODO(dnguyen0304): Investigate why makePluginConfig must not be used.
        //   The error is "The tag <admonition> is unrecognized in this browser.
        //   If you meant to render a React component, start its name with an
        //   uppercase letter."
        ['@docusaurus/theme-classic', resolveTheme(theme)]);
    if (algolia) {
        themes.push(require.resolve('@docusaurus/theme-search-algolia'));
    }
    themes.push(
        makePluginConfig(
            '@docupotamus/docusaurus-theme-common',
            { swizzleIsEnabled: false },
        ),
        makePluginConfig('@docupotamus/docusaurus-theme-environment-variables'),
        makePluginConfig(
            '@docupotamus/docusaurus-theme-task-list',
            { swizzleIsEnabled: false },
        ),
        makePluginConfig(
            '@docupotamus/docusaurus-theme-zen',
            { swizzleIsEnabled: false },
        ),
        makePluginConfig('./plugin'),
    );

    if ('gtag' in themeConfig) {
        throw new Error(
            'The "gtag" field in themeConfig should now be specified as option for plugin-google-gtag. For preset-classic, simply move themeConfig.gtag to preset options. More information at https://github.com/facebook/docusaurus/pull/5832.',
        );
    }
    if ('googleAnalytics' in themeConfig) {
        throw new Error(
            'The "googleAnalytics" field in themeConfig should now be specified as option for plugin-google-analytics. For preset-classic, simply move themeConfig.googleAnalytics to preset options. More information at https://github.com/facebook/docusaurus/pull/5832.',
        );
    }

    const plugins: PluginConfig[] = [];
    if (docs !== false) {
        plugins.push(makePluginConfig(
            '@docupotamus/docusaurus-plugin-content-docs-src-hook',
            {
                ...docs,
                swizzleIsEnabled: false
            },
        ));
    }
    if (blog !== false) {
        plugins.push(makePluginConfig('@docusaurus/plugin-content-blog', blog));
    }
    if (pages !== false) {
        plugins.push(makePluginConfig('@docusaurus/plugin-content-pages', pages));
    }
    if (googleAnalytics) {
        plugins.push(
            makePluginConfig('@docusaurus/plugin-google-analytics', googleAnalytics),
        );
    }
    if (debug || (debug === undefined && !isProd)) {
        plugins.push(require.resolve('@docusaurus/plugin-debug'));
    }
    if (gtag) {
        plugins.push(makePluginConfig('@docusaurus/plugin-google-gtag', gtag));
    }
    if (isProd && sitemap !== false) {
        plugins.push(makePluginConfig('@docusaurus/plugin-sitemap', sitemap));
    }
    if (Object.keys(rest).length > 0) {
        // TODO(dnguyen0304): Update message for Docupotamus keys.
        throw new Error(
            `Unrecognized keys ${Object.keys(rest).join(
                ', ',
            )} found in preset-classic configuration. The allowed keys are debug, docs, blog, pages, sitemap, theme, googleAnalytics, gtag. Check the documentation: https://docusaurus.io/docs/using-plugins#docusauruspreset-classic for more information on how to configure individual plugins.`,
        );
    }

    const lastTheme = themes.at(-1)?.toString() ?? '';
    const isInternalTheme = (
        lastTheme.includes('docusaurus-preset-classic') // repository name
        && lastTheme.endsWith('plugin/index.js') // sub-directory name
    );
    if (lastTheme && !isInternalTheme) {
        throw new Error(`Expected the last theme to be the preset's internal theme but instead found "${lastTheme}". Try checking the themes item order.`);
    }
    return { plugins, themes };
};

export type { Options, ThemeConfig };
