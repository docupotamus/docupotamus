import type { WrapperProps } from '@docusaurus/types';
import type DocPageType from '@theme/DocPage';
import * as React from 'react';
import { RawContentProvider } from '../../package/contexts/rawContent';

type Props = Readonly<WrapperProps<typeof DocPageType> & {
    children: React.ReactNode;
}>;

// Do not move to DocPage/Layout. While many existing doc8 plugins and themes
// swizzle DocPage/Layout, the rawContent prop is only available to DocPage.
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
