/// <reference types="@docupotamus/docusaurus-theme-common" />

declare module '@docupotamus/docusaurus-theme-zen' {
    interface PluginOptions {
        readonly swizzleIsEnabled: boolean;
    }

    interface ThemeConfig {
        readonly visibilityRadiusPx: number;
    }
}

declare module '@docupotamus/theme-zen' {
    export * from '@docupotamus/docusaurus-theme-zen';
}

declare module '@doc8/theme-zen' {
    export * from '@docupotamus/docusaurus-theme-zen';
}

declare module '@theme/docupotamus-zen' {
    import type DocPageLayoutType from '@theme/DocPage/Layout';

    export const DocPageLayoutDecorator: typeof DocPageLayoutType;
}
