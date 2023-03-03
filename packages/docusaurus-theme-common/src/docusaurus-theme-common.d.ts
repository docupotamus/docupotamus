declare module '@docupotamus/docusaurus-theme-common' {
    interface PluginOptions {
        readonly swizzleIsEnabled: boolean;
    }

    interface CommonThemeConfig {
        readonly debug: {
            readonly loading: {
                readonly isEnabled: boolean;
                readonly durationMilli: number;
            };
        };
    }
}

declare module '@docupotamus/theme-common' {
    export * from '@docupotamus/docusaurus-theme-common';
}

declare module '@theme/docupotamus-common' {
    import type DocPageLayoutType from '@theme/DocPage/Layout';
    import type DocPageLayoutMainType from '@theme/DocPage/Layout/Main';
    import type RootType from '@theme/Root';

    export const DocPageLayoutDecorator: typeof DocPageLayoutType;
    export const DocPageLayoutMainDecorator: typeof DocPageLayoutMainType;
    export const RootDecorator: typeof RootType;
}
