import { ReactContextError } from '@docupotamus/docusaurus-lib-common/contexts';
import * as React from 'react';

interface ContextValue {
    readonly directChildren: HTMLElement[];
    readonly setDirectChildren: React.Dispatch<React.SetStateAction<
        HTMLElement[]
    >>;
};

const Context = React.createContext<ContextValue | undefined>(undefined);

const useContextValue = (): ContextValue => {
    const [directChildren, setDirectChildren] =
        React.useState<HTMLElement[]>([]);

    return React.useMemo(
        () => ({
            directChildren,
            setDirectChildren,
        }),
        [
            directChildren,
            setDirectChildren,
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

export const useMarkdown = (): ContextValue => {
    const context = React.useContext(Context);
    if (context === undefined) {
        throw new ReactContextError('MarkdownProvider');
    }
    return context;
};
