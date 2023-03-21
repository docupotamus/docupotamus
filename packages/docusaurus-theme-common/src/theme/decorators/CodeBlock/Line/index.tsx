import type { WrapperProps } from '@docusaurus/types';
import type CodeBlockLineType from '@theme/CodeBlock/Line';
import * as React from 'react';
import CodeBlockObserver from '../../../package/components/CodeBlockObserver';

type Props = Readonly<WrapperProps<typeof CodeBlockLineType> & {
    children: React.ReactNode;
}>;

export default function CodeBlockLineDecorator(
    {
        children,
    }: Props
): JSX.Element {
    return (
        <CodeBlockObserver>
            {children}
        </CodeBlockObserver>
    );
};
