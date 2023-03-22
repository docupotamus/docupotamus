/// <reference types="@docusaurus/plugin-content-docs" />

declare module '@docupotamus/docusaurus-plugin-content-docs-src-hook' {
    interface PluginOptions {
        readonly swizzleIsEnabled: boolean;
    }

    interface RawContent {
        readonly [key: string]: string;
    }

    interface ContextValue {
        readonly rawContent: RawContent;
        readonly setRawContent: React.Dispatch<React.SetStateAction<
            RawContent
        >>;
    }
}

declare module '@docupotamus/plugin-content-docs-src-hook' {
    export * from '@docupotamus/docusaurus-plugin-content-docs-src-hook';
}

declare module '@doc8/plugin-content-docs-src-hook' {
    export * from '@docupotamus/docusaurus-plugin-content-docs-src-hook';
}

declare module '@theme/docupotamus-plugin-content-docs-src-hook' {
    import type { ContextValue } from '@doc8/plugin-content-docs-src-hook';

    export const useRawMarkdown: () => ContextValue;
}

declare module '@docusaurus/plugin-content-docs' {
    import type {
        Options,
        PluginOptions
    } from '@docusaurus/plugin-content-docs';
    import type { OptionValidationContext } from '@docusaurus/types';

    export function validateOptions(
        {
            validate,
            options,
        }: OptionValidationContext<Options, PluginOptions>
    ): PluginOptions;
}
