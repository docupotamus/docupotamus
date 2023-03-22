import type { WrapperProps } from '@docusaurus/types';
import type DocPageType from '@theme/DocPage';
import * as React from 'react';
import { RawContentProvider } from '../../package/contexts/rawContent';

type Props = Readonly<WrapperProps<typeof DocPageType> & {
    children: React.ReactNode;
}>;

export default function DocPageDecorator(
    {
        rawContent,
        children,
    }: Props
): JSX.Element {
    return (
        <RawContentProvider rawContent={rawContent}>
            {children}
        </RawContentProvider>
    );
};
