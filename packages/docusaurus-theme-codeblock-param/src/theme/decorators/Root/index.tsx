import { useLocation } from '@docusaurus/router';
import * as React from 'react';
import {
    useVariables,
    VariablesProvider
} from '../../package/contexts/variables';
import '../../package/styles.css';

interface Props {
    readonly children: React.ReactNode;
};

const VariablesConsumer = ({ children }: Props): JSX.Element => {
    const location = useLocation();
    const { setVariables } = useVariables();

    // Clear the page-scoped variables on location. StrictMode is enabled in
    // development so components are rendered twice. This causes duplicate
    // variables. @theme/CodeBlock/Line is rendered for each line but needs to
    // be cleared as a single batch. Therefore, we define this behavior in a
    // component that (1) renders before @theme/CodeBlock/Line and (2) renders
    // only once on location.
    React.useEffect(() => {
        setVariables([]);
    }, [location]);

    return (
        <>
            {children}
        </>
    );
};

export default function RootDecorator({ children }: Props): JSX.Element {
    return (
        <VariablesProvider>
            <VariablesConsumer>
                {children}
            </VariablesConsumer>
        </VariablesProvider>
    );
};
