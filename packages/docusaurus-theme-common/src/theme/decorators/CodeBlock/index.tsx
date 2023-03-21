import type { WrapperProps } from '@docusaurus/types';
import type CodeBlockType from '@theme/CodeBlock';
import * as React from 'react';
import MarkdownObserver from '../../package/components/MarkdownObserver';

type Props = Readonly<WrapperProps<typeof CodeBlockType>>;

export default function CodeBlockDecorator({ children }: Props): JSX.Element {
    return (
        <MarkdownObserver>
            {children}
        </MarkdownObserver>
    );
};
