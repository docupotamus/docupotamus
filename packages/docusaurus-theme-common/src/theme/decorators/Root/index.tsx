import ToolbarEntry from '@theme/docupotamus-common/Toolbar/Entry';
import * as React from 'react';
import { MarkdownProvider } from '../../package/contexts/markdown';
import { ToolbarProvider } from '../../package/contexts/toolbar';
import '../../package/styles.css';

interface Props {
    readonly children: React.ReactNode;
};

export default function RootDecorator({ children }: Props): JSX.Element {
    return (
        <MarkdownProvider>
            <ToolbarProvider>
                <ToolbarEntry>
                    {children}
                </ToolbarEntry>
            </ToolbarProvider>
        </MarkdownProvider>
    );
};
