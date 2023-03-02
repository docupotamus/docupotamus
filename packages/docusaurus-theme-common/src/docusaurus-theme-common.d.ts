declare module '@docupotamus/docusaurus-theme-common' {
    interface PluginOptions {
        readonly swizzleIsEnabled: boolean;
    }

    interface CommonThemeConfig {
        readonly tabs: readonly TabConfig[];
    }

    interface TabConfig {
        readonly tabId: string;
        readonly modulePath: string;
        readonly iconModulePath: string;
    }
}

declare module '@docupotamus/theme-common' {
    export * from '@docupotamus/docusaurus-theme-common';
}

declare module '@theme/docupotamus-common' {
    import type DocPageLayoutMainType from '@theme/DocPage/Layout/Main';
    import type RootType from '@theme/Root';

    export const DocPageLayoutMainDecorator: typeof DocPageLayoutMainType;
    export const RootDecorator: typeof RootType;
}
