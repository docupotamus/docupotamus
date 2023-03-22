import type { WrapperProps } from '@docusaurus/types';
import type DocPageLayoutType from '@theme/DocPage/Layout';
import * as React from 'react';
import { RawContentProvider } from '../../../package/contexts/rawContent';

type Props = Readonly<WrapperProps<typeof DocPageLayoutType>>;

export default function DocPageLayoutDecorator(
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
