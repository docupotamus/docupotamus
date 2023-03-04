import { ReactContextError } from '@docupotamus/docusaurus-lib-common/contexts';
import * as React from 'react';

interface TabConfig {
    readonly Component: React.LazyExoticComponent<() => JSX.Element>;
    readonly IconComponent: React.LazyExoticComponent<() => JSX.Element>;
};

interface TabIdToConfig extends ReadonlyMap<string, TabConfig> { };

// TODO(dnguyen0304): Investigate dynamic instead of hard-coded configuration.
const tabIdToConfig: TabIdToConfig = new Map(
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
);

interface ContextValue {
    readonly tabIdToConfig: TabIdToConfig;
    readonly activeTabId: string;
    readonly setActiveTabId: React.Dispatch<React.SetStateAction<string>>;
};

const Context = React.createContext<ContextValue | undefined>(undefined);

const useContextValue = (): ContextValue => {
    const [activeTabId, setActiveTabId] = React.useState<string>('');

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
