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
