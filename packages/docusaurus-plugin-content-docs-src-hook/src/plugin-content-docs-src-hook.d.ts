/// <reference types="@docusaurus/plugin-content-docs" />

declare module '@docupotamus/docusaurus-plugin-content-docs-src-hook' {
    import type {
        PluginOptions as BasePluginOptions
    } from '@docusaurus/plugin-content-docs';

    interface SrcHookPluginOptions {
        readonly swizzleIsEnabled: boolean;
    }

    type AllPluginOptions = BasePluginOptions & SrcHookPluginOptions;

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
    import type DocPageType from '@theme/DocPage';

    export const DocPageDecorator: typeof DocPageType;
    export const useRawContent: () => ContextValue;
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

declare module '@theme/DocPage' {
    import type { RawContent } from '@doc8/plugin-content-docs-src-hook';

    export interface Props {
        readonly rawContent: RawContent;
    }

    export default function DocPage(props: Props): JSX.Element;
}
