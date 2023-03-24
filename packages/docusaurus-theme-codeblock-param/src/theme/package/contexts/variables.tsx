import { Variable } from '@doc8/theme-codeblock-param';
import { ReactContextError } from '@docupotamus/docusaurus-lib-common/contexts';
import * as React from 'react';

interface ContextValue {
    readonly variables: readonly Variable[];
    readonly setVariables: React.Dispatch<React.SetStateAction<Variable[]>>;
};

const Context = React.createContext<ContextValue | undefined>(undefined);

const useContextValue = (): ContextValue => {
    const [variables, setVariables] = React.useState<Variable[]>([]);

    return React.useMemo(
        () => ({
            variables,
            setVariables,
        }),
        [
            variables,
            setVariables,
        ],
    );
};

interface Props {
    readonly children: React.ReactNode;
};

export const VariablesProvider = ({ children }: Props): JSX.Element => {
    const value = useContextValue();

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};

export const useVariables = (): ContextValue => {
    const context = React.useContext(Context);
    if (context === undefined) {
        throw new ReactContextError('VariablesProvider');
    }
    return context;
};
