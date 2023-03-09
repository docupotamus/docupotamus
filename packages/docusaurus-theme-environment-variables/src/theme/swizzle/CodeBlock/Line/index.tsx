import type { WrapperProps } from '@docusaurus/types';
import CodeBlockLineInit from '@theme-init/CodeBlock/Line';
import type CodeBlockLineType from '@theme/CodeBlock/Line';
import * as React from 'react';

type Props = Readonly<WrapperProps<typeof CodeBlockLineType>>;

export default function CodeBlockLineWrapper(props: Props): JSX.Element {
    return (
        <CodeBlockLineInit {...props} />
    );
};
