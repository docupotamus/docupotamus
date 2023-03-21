import { MarkdownContextValue } from '@doc8/theme-common';
import { ReactContextError } from '@docupotamus/docusaurus-lib-common/contexts';
import * as React from 'react';

const Context =
    React.createContext<MarkdownContextValue | undefined>(undefined);

const useContextValue = (): MarkdownContextValue => {
    const [directChildren, _internalSetDirectChildren] =
        React.useState<Element[]>([]);

    return React.useMemo(
        () => ({
            directChildren,
            _internalSetDirectChildren,
        }),
        [
            directChildren,
            _internalSetDirectChildren,
        ],
    );
};

interface Props {
    readonly children: React.ReactNode;
};

export const MarkdownProvider = ({ children }: Props): JSX.Element => {
    const value = useContextValue();

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};

export const useMarkdown = (): MarkdownContextValue => {
    const context = React.useContext(Context);
    if (context === undefined) {
        throw new ReactContextError('MarkdownProvider');
    }
    return context;
};
