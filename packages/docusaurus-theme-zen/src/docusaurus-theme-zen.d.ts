declare module '@docupotamus/docusaurus-theme-zen' {
    interface PluginOptions {
        readonly swizzleIsEnabled: boolean;
    }

    interface ZenThemeConfig { }
}

declare module '@docupotamus/theme-zen' {
    export * from '@docupotamus/docusaurus-theme-zen';
}

declare module '@doc8/theme-zen' {
    export * from '@docupotamus/docusaurus-theme-zen';
}

declare module '@theme/docupotamus-zen' {
}
