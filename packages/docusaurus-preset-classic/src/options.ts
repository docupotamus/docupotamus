import type { Options as BlogPluginOptions } from '@docusaurus/plugin-content-blog';
import type { Options as DocsPluginOptions } from '@docusaurus/plugin-content-docs';
import type { Options as PagesPluginOptions } from '@docusaurus/plugin-content-pages';
import type { Options as GAPluginOptions } from '@docusaurus/plugin-google-analytics';
import type { Options as GtagPluginOptions } from '@docusaurus/plugin-google-gtag';
import type { Options as SitemapPluginOptions } from '@docusaurus/plugin-sitemap';
import type { Options as ThemeOptions } from '@docusaurus/theme-classic';
import type { UserThemeConfig as ClassicThemeConfig } from '@docusaurus/theme-common';
import type { UserThemeConfig as AlgoliaThemeConfig } from '@docusaurus/theme-search-algolia';
import type { ThemeConfig as BaseThemeConfig } from '@docusaurus/types';

export type Options = {
    /**
     * Options for `@docusaurus/plugin-debug`. Use `false` to disable, or `true`
     * to enable even in production.
     */
    debug?: boolean;
    /** Options for `@docusaurus/plugin-content-docs`. Use `false` to disable. */
    docs?: false | DocsPluginOptions;
    /** Options for `@docusaurus/plugin-content-blog`. Use `false` to disable. */
    blog?: false | BlogPluginOptions;
    /** Options for `@docusaurus/plugin-content-pages`. Use `false` to disable. */
    pages?: false | PagesPluginOptions;
    /** Options for `@docusaurus/plugin-sitemap`. Use `false` to disable. */
    sitemap?: false | SitemapPluginOptions;
    /** Options for `@docusaurus/theme-classic`. */
    theme?: ThemeOptions;
    /**
     * Options for `@docusaurus/plugin-google-analytics`. Only enabled when the
     * key is present.
     */
    googleAnalytics?: GAPluginOptions;
    /**
     * Options for `@docusaurus/plugin-google-gtag`. Only enabled when the key
     * is present.
     */
    gtag?: GtagPluginOptions;
} & {
    /** Options for `@docupotamus/theme-codeblock-param`. Use `false` to
     *  disable. */
    param?: false;
    /** Options for `@docupotamus/theme-task-list`. Use `false` to disable. */
    taskList?: false;
    /** Options for `@docupotamus/theme-zen`. Use `false` to disable. */
    zen?: false;
};

export type ThemeConfig = BaseThemeConfig &
    ClassicThemeConfig &
    AlgoliaThemeConfig;
