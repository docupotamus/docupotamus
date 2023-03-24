import { useLocation } from '@docusaurus/router';
import * as React from 'react';
import {
    ParamsProvider,
    useParams
} from '../../package/contexts/variables';
import '../../package/styles.css';

interface Props {
    readonly children: React.ReactNode;
};

const ParamsConsumer = ({ children }: Props): JSX.Element => {
    const location = useLocation();
    const { setParams } = useParams();

    // Clear the page-scoped parameters on location. StrictMode is enabled in
    // development so components are rendered twice. This causes duplicate
    // parameters. @theme/CodeBlock/Line is rendered for each line but needs to
    // be cleared as a single batch. Therefore, we define this behavior in a
    // component that (1) renders before @theme/CodeBlock/Line and (2) renders
    // only once on location.
    React.useEffect(() => {
        setParams([]);
    }, [location]);

    return (
        <>
            {children}
        </>
    );
};

export default function RootDecorator({ children }: Props): JSX.Element {
    return (
        <ParamsProvider>
            <ParamsConsumer>
                {children}
            </ParamsConsumer>
        </ParamsProvider>
    );
};
