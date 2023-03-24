import { Param } from '@doc8/theme-codeblock-param';
import { ReactContextError } from '@docupotamus/docusaurus-lib-common/contexts';
import * as React from 'react';

interface ContextValue {
    readonly params: readonly Param[];
    readonly setParams: React.Dispatch<React.SetStateAction<Param[]>>;
};

const Context = React.createContext<ContextValue | undefined>(undefined);

const useContextValue = (): ContextValue => {
    const [params, setParams] = React.useState<Param[]>([]);

    return React.useMemo(
        () => ({
            params,
            setParams,
        }),
        [
            params,
            setParams,
        ],
    );
};

interface Props {
    readonly children: React.ReactNode;
};

export const ParamsProvider = ({ children }: Props): JSX.Element => {
    const value = useContextValue();

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};

export const useParams = (): ContextValue => {
    const context = React.useContext(Context);
    if (context === undefined) {
        throw new ReactContextError('ParamsProvider');
    }
    return context;
};
