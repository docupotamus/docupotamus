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
        // Calling MarkdownObserver again here is a fallback for DocItem's
        // that do not contain any code blocks. CodeBlock is always rendered
        // after DocItem so a correct overwrite of the context is guaranteed.
        //
        // TODO(dnguyen0304): Investigate including only if there are no code
        //   blocks.
        <MarkdownObserver>
            {children}
        </MarkdownObserver>
    );
};
