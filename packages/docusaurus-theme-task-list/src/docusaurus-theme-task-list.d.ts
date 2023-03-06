declare module '@docupotamus/docusaurus-theme-task-list' {
    import { CheckboxProps } from '@mui/material/Checkbox';

    interface PluginOptions {
        readonly swizzleIsEnabled: boolean;
    }

    // See: https://www.docupotamus.io/docs/themes/theme-task-list#configuration
    interface TaskListThemeConfig {
        readonly checkbox: {
            readonly color: React.CSSProperties['color'];
            readonly shape: CheckboxShape;
            readonly size: CheckboxProps['size'];
        };
        readonly progressBar: {
            readonly isEnabled: boolean;
            readonly color: React.CSSProperties['color'];
        };
    }

    type CheckboxShape = 'circle' | 'square';

    type KeyBindings =
        | 'TAB_PREVIOUS'
        | 'TAB_NEXT';
}

declare module '@docupotamus/theme-task-list' {
    export * from '@docupotamus/docusaurus-theme-task-list';
}

declare module '@theme/docupotamus-task-list' {
    import { SvgIconComponent } from '@mui/icons-material';
    import type RootType from '@theme/Root';

    export const RootDecorator: typeof RootType;
    export const WorkbenchIcon: SvgIconComponent;
    export const WorkbenchTab: () => JSX.Element;
}
