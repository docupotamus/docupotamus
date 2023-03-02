import * as React from 'react';
import Toolbar from '../../../../package/components/Toolbar';

interface Props {
    readonly children: React.ReactNode;
};

export default function MainDecorator({ children }: Props): JSX.Element {
    return (
        <>
            {children}
            <Toolbar />
        </>
    );
};
