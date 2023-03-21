import type { WrapperProps } from '@docusaurus/types';
import type DocItemContentType from '@theme/DocItem/Content';
import * as React from 'react';
import MarkdownObserver from '../../../package/components/MarkdownObserver';

type Props = Readonly<WrapperProps<typeof DocItemContentType>>;

export default function DocItemContentDecorator(
    {
        children,
    }: Props
): JSX.Element {
    return (
        <MarkdownObserver>
            {children}
        </MarkdownObserver>
    );
};
