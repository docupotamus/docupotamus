import { ReactContextError } from '@docupotamus/docusaurus-lib-common/contexts';
import {
    Action,
    ContextValue,
    TabIdToConfig
} from '@docupotamus/theme-common';
import * as React from 'react';

const reducer = (prev: TabIdToConfig, action: Action): TabIdToConfig => {
    const newMapping = new Map(prev);
    if (action.type === 'setTab') {
        newMapping.set(action.tabId, {
            tabId: action.tabId,
            displayName: action.newValue.displayName,
            Component: action.newValue.Component,
            IconComponent: action.newValue.IconComponent,
        });
    }
    return newMapping;
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
