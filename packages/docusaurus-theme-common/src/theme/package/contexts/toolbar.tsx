import {
    Action,
    TabIdToConfig,
    ToolbarContextValue
} from '@doc8/theme-common';
import { ReactContextError } from '@docupotamus/docusaurus-lib-common/contexts';
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

const Context = React.createContext<ToolbarContextValue | undefined>(undefined);

const useContextValue = (): ToolbarContextValue => {
    const [tabIdToConfig, dispatchTabIdToConfig] = React.useReducer(
        reducer,
        new Map(),
    );
    const [_internalActiveTabId, _internalSetActiveTabId] =
        React.useState<string>('');

    return React.useMemo(
        () => ({
            tabIdToConfig,
            _internalActiveTabId,
            dispatchTabIdToConfig,
            _internalSetActiveTabId,
        }),
        [
            tabIdToConfig,
            _internalActiveTabId,
            dispatchTabIdToConfig,
            _internalSetActiveTabId,
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

export const useToolbar = (): ToolbarContextValue => {
    const context = React.useContext(Context);
    if (context === undefined) {
        throw new ReactContextError('ToolbarProvider');
    }
    return context;
};
