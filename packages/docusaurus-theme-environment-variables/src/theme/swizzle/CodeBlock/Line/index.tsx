import type { WrapperProps } from '@docusaurus/types';
import type CodeBlockLineType from '@theme/CodeBlock/Line';
import * as React from 'react';
import CodeBlockLine from '../../../package/components/CodeBlock/Line';

type Props = Readonly<WrapperProps<typeof CodeBlockLineType>>;

export default function CodeBlockLineWrapper(props: Props): JSX.Element {
    return (
        <CodeBlockLine {...props} />
    );
};
