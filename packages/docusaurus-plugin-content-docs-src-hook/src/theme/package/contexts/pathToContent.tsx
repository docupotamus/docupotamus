import type {
    ContextValue,
    PathToContent
} from '@doc8/plugin-content-docs-src-hook';
import { ReactContextError } from '@docupotamus/docusaurus-lib-common/contexts';
import * as React from 'react';

const Context = React.createContext<ContextValue | undefined>(undefined);

const useContextValue = (value: PathToContent): ContextValue => {
    const [pathToContent, setPathToContent] =
        React.useState<PathToContent>(value);

    return React.useMemo(
        () => ({
            pathToContent,
            setPathToContent,
        }),
        [
            pathToContent,
            setPathToContent,
        ],
    );
};

interface Props {
    readonly pathToContent: PathToContent;
    readonly children: React.ReactNode;
};

export const PathToContentProvider = (
    {
        pathToContent,
        children,
    }: Props
): JSX.Element => {
    const value = useContextValue(pathToContent);

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};

export const usePathToContent = (): ContextValue => {
    const context = React.useContext(Context);
    if (context === undefined) {
        throw new ReactContextError('PathToContentProvider');
    }
    return context;
};
