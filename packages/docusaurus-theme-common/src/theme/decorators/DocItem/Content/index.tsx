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
        // TODO(dnguyen0304): Investigate including only if there are no code
        //   blocks.
        <MarkdownObserver>
            {children}
        </MarkdownObserver>
    );
};
