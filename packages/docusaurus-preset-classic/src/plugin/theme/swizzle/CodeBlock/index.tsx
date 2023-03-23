import type { WrapperProps } from '@docusaurus/types';
import CodeBlockInit from '@theme-init/CodeBlock';
import type CodeBlockType from '@theme/CodeBlock';
import * as React from 'react';

type Props = Readonly<WrapperProps<typeof CodeBlockType>>;

export default function CodeBlockWrapper(props: Props): JSX.Element {
    return (
        <CodeBlockInit {...props} />
    );
};
