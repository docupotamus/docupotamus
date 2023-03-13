/// <reference types="@docusaurus/theme-classic" />

declare module '@docupotamus/docusaurus-theme-environment-variables' {
    interface PluginOptions { }
    interface EnvironmentVariablesThemeConfig { }

    // TODO(dnguyen0304): Investigate adding isRequired.
    interface Variable {
        readonly name: string;
        readonly defaultValue: string;
        readonly currValue: string;
        readonly element: HTMLElement;
    }
}

declare module '@docupotamus/theme-environment-variables' {
    export * from '@docupotamus/docusaurus-theme-environment-variables';
}

declare module '@theme/docupotamus-environment-variables' {
    import { SvgIconComponent } from '@mui/icons-material';
    import type CodeBlockType from '@theme/CodeBlock/Line';

    export const CodeBlockLine: typeof CodeBlockType;
    export const WorkbenchIcon: SvgIconComponent;
    export const WorkbenchTab: () => JSX.Element;
}
