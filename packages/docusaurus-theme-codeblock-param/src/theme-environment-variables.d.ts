/// <reference types="@docusaurus/theme-classic" />

declare module '@docupotamus/docusaurus-theme-codeblock-param' {
    // TODO(dnguyen0304): Investigate adding isRequired.
    interface Variable {
        readonly name: string;
        readonly defaultValue: string;
        readonly currValue: string;
        readonly ref: React.RefObject<HTMLSpanElement>;
    }
}

declare module '@docupotamus/theme-codeblock-param' {
    export * from '@docupotamus/docusaurus-theme-codeblock-param';
}

declare module '@doc8/theme-codeblock-param' {
    export * from '@docupotamus/docusaurus-theme-codeblock-param';
}

declare module '@theme/docupotamus-codeblock-param' {
    import { SvgIconComponent } from '@mui/icons-material';
    import type CodeBlockType from '@theme/CodeBlock/Line';
    import type RootType from '@theme/Root';

    export const RootDecorator: typeof RootType;
    export const CodeBlockLine: typeof CodeBlockType;
    export const WorkbenchIcon: SvgIconComponent;
    export const WorkbenchTab: () => JSX.Element;
}
