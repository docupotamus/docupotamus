/// <reference types="@docusaurus/plugin-content-docs" />

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
