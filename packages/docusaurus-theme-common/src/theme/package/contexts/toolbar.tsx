import { ReactContextError } from '@docupotamus/docusaurus-lib-common/contexts';
import * as React from 'react';

interface TabConfig {
    readonly tabId: string;
    readonly Component: JSX.Element;
    readonly IconComponent: JSX.Element;
};

interface TabIdToConfig extends ReadonlyMap<string, TabConfig> { };

type Action =
    | {
        type: 'setTab';
        tabId: string;
        newValue: TabConfig;
    };

const reducer = (prev: TabIdToConfig, action: Action): TabIdToConfig => {
    const newMapping = new Map(prev);
    if (action.type === 'setTab') {
        newMapping.set(action.tabId, {
            tabId: action.tabId,
            Component: action.newValue.Component,
            IconComponent: action.newValue.IconComponent,
        });
    }
    return newMapping;
};

interface ContextValue {
    readonly tabIdToConfig: TabIdToConfig;
    readonly activeTabId: string;
    readonly dispatchTabIdToConfig: React.Dispatch<Action>;
    readonly setActiveTabId: React.Dispatch<React.SetStateAction<string>>;
};

const Context = React.createContext<ContextValue | undefined>(undefined);

const useContextValue = (): ContextValue => {
    const [tabIdToConfig, dispatchTabIdToConfig] = React.useReducer(
        reducer,
        new Map(),
    );
    const [activeTabId, setActiveTabId] = React.useState<string>('');

    return React.useMemo(
        () => ({
            tabIdToConfig,
            activeTabId,
            dispatchTabIdToConfig,
            setActiveTabId,
        }),
        [
            tabIdToConfig,
            activeTabId,
            dispatchTabIdToConfig,
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
