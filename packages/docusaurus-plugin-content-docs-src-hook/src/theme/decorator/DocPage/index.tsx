import type { WrapperProps } from '@docusaurus/types';
import type DocPageType from '@theme/DocPage';
import * as React from 'react';
import { PathToContentProvider } from '../../package/contexts/rawContent';

type Props = Readonly<WrapperProps<typeof DocPageType> & {
    children: React.ReactNode;
}>;

// Do not move to DocPage/Layout. While many existing doc8 plugins and themes
// swizzle DocPage/Layout, the pathToContent prop is only available to DocPage.
export default function DocPageDecorator(
    {
        pathToContent,
        children,
    }: Props
): JSX.Element {
    return (
        <PathToContentProvider pathToContent={pathToContent}>
            {children}
        </PathToContentProvider>
    );
};
