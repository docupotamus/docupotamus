/// <reference types="@docusaurus/plugin-content-docs" />

declare module '@docupotamus/docusaurus-plugin-content-docs-src-hook' {
    import type {
        Options as BaseOptions,
        PluginOptions as BasePluginOptions
    } from '@docusaurus/plugin-content-docs';

    interface PluginOptions extends BasePluginOptions {
        readonly swizzleIsEnabled: boolean;
    }

    // This is a plugin-content-docs convention.
    interface Options extends BaseOptions {
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
    import type DocPageLayoutType from '@theme/DocPage/Layout';

    export const DocPageLayoutDecorator: typeof DocPageLayoutType;
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

declare module '@theme/DocPage/Layout' {
    import type { RawContent } from '@doc8/plugin-content-docs-src-hook';

    export interface Props {
        readonly rawContent: RawContent;
    }

    export default function DocPageLayout(props: Props): JSX.Element;
}