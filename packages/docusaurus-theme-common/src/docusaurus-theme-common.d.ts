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

    // TODO(dnguyen0304): Investigate moving these to toolbar context.

    // If change, then change:
    //   https://www.docupotamus.io/docs/themes/theme-common#interface
    // We refer to the controller as the "Toolbar", the content for each
    // integrated add-on as a "Tab", and the tabs container as the
    // "Workbench".
    interface TabConfig {
        // Tab unique identifier.
        readonly tabId: string;

        // Display header text that is human-readable.
        readonly displayName: string;

        // Tab component.
        readonly Component: JSX.Element;

        // Toolbar icon component.
        readonly IconComponent: JSX.Element;
    }

    interface TabIdToConfig extends ReadonlyMap<string, TabConfig> { }

    type Action =
        | {
            type: 'setTab';
            tabId: string;
            newValue: Omit<TabConfig, 'tabId'>;
        }

    interface ContextValue {
        readonly tabIdToConfig: TabIdToConfig;
        readonly activeTabId: string;
        readonly dispatchTabIdToConfig: React.Dispatch<Action>;
        readonly setActiveTabId: React.Dispatch<React.SetStateAction<string>>;
    }
}

declare module '@docupotamus/theme-common' {
    export * from '@docupotamus/docusaurus-theme-common';
}

declare module '@doc8/theme-common' {
    export * from '@docupotamus/docusaurus-theme-common';
}

declare module '@theme/docupotamus-common' {
    import type { ContextValue } from '@doc8/theme-common';
    import type DocPageLayoutType from '@theme/DocPage/Layout';
    import type DocPageLayoutMainType from '@theme/DocPage/Layout/Main';
    import type RootType from '@theme/Root';

    export const DocPageLayoutDecorator: typeof DocPageLayoutType;
    export const DocPageLayoutMainDecorator: typeof DocPageLayoutMainType;
    export const RootDecorator: typeof RootType;
    export const useToolbar: () => ContextValue;
}

declare module '@theme/docupotamus-common/Toolbar/Entry' {
    interface Props {
        readonly children: React.ReactNode;
    }

    export default function Entry(props: Props): JSX.Element;
}
