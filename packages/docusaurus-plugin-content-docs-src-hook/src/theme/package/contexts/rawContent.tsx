import type {
    ContextValue,
    RawContent
} from '@doc8/plugin-content-docs-src-hook';
import { ReactContextError } from '@docupotamus/docusaurus-lib-common/contexts';
import * as React from 'react';

const Context = React.createContext<ContextValue | undefined>(undefined);

const useContextValue = (value: RawContent): ContextValue => {
    const [rawContent, setRawContent] = React.useState<RawContent>(value);

    return React.useMemo(
        () => ({
            rawContent,
            setRawContent,
        }),
        [
            rawContent,
            setRawContent,
        ],
    );
};

interface Props {
    readonly rawContent: RawContent;
    readonly children: React.ReactNode;
};

export const RawContentProvider = (
    {
        rawContent,
        children,
    }: Props
): JSX.Element => {
    const value = useContextValue(rawContent);

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};

export const useRawContent = (): ContextValue => {
    const context = React.useContext(Context);
    if (context === undefined) {
        throw new ReactContextError('RawContentProvider');
    }
    return context;
};
