import * as React from 'react';
import { ToolbarProvider } from '../../package/contexts/toolbar';

interface Props {
    readonly children: React.ReactNode;
};

export default function RootDecorator({ children }: Props): JSX.Element {
    return (
        <ToolbarProvider>
            {children}
        </ToolbarProvider>
    );
};
