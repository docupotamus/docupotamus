import { ReactContextError } from '@docupotamus/docusaurus-lib-common/contexts';
import * as React from 'react';

interface BaseTabConfig {
    readonly tabId: string;
    readonly modulePath: string;
    readonly iconModulePath: string;
}

interface TabConfig {
    readonly Component: React.LazyExoticComponent<() => JSX.Element>;
    readonly IconComponent: React.LazyExoticComponent<() => JSX.Element>;
};

interface TabIdToConfig extends ReadonlyMap<string, TabConfig> { };

const tabConfigs: readonly BaseTabConfig[] = [];

// TODO(dnguyen0304): Add real implementation.
//   See: https://stackoverflow.com/a/47956054
//   See: https://stackoverflow.com/a/58350377
//   See: https://github.com/facebook/react/issues/14603
const keyByTabId = (tabConfigs: readonly BaseTabConfig[]): TabIdToConfig => {
    return new Map(
        [[
            'task-list',
            {
                Component: React.lazy(() => import(
                    '@theme/docupotamus-task-list'
                ).then(module => ({ default: module.WorkbenchTab }))),
                IconComponent: React.lazy(() => import(
                    '@theme/docupotamus-task-list'
                ).then(module => ({ default: module.WorkbenchIcon }))),
            },
        ]],
        // tabConfigs.map(tabConfig => [
        //     tabConfig.tabId,
        //     {
        //         Component: React.lazy(() =>
        //             import(`${tabConfig.modulePath}`)
        //                 .then(module => ({ default: module.WorkbenchTab }))
        //         ),
        //         IconComponent: React.lazy(() =>
        //             import(`${tabConfig.iconModulePath}`)
        //                 .then(module => ({ default: module.WorkbenchIcon }))
        //         ),
        //     },
        // ])
    );
};

interface ContextValue {
    readonly tabIdToConfig: TabIdToConfig;
    readonly activeTabId: string;
    readonly setActiveTabId: React.Dispatch<React.SetStateAction<string>>;
};

const Context = React.createContext<ContextValue | undefined>(undefined);

const useContextValue = (): ContextValue => {
    const [activeTabId, setActiveTabId] = React.useState<string>('');

    const tabIdToConfig = keyByTabId(tabConfigs);

    return React.useMemo(
        () => ({
            tabIdToConfig,
            activeTabId,
            setActiveTabId,
        }),
        [
            tabIdToConfig,
            activeTabId,
            setActiveTabId,
        ],
    );
};

interface Props {
    readonly children: React.ReactNode;
};

export const ToolbarProvider = ({ children }: Props): JSX.Element => {
    const value = useContextValue();

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};

export const useToolbar = (): ContextValue => {
    const context = React.useContext(Context);
    if (context === undefined) {
        throw new ReactContextError('ToolbarProvider');
    }
    return context;
};
