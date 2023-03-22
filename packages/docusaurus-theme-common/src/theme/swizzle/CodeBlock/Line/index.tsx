import type { WrapperProps } from '@docusaurus/types';
import CodeBlockLineInit from '@theme-init/CodeBlock/Line';
import type CodeBlockLineType from '@theme/CodeBlock/Line';
import * as React from 'react';
import Decorator from '../../../decorators/CodeBlock/Line';

type Props = Readonly<WrapperProps<typeof CodeBlockLineType>>;

export default function CodeBlockLineOverwrite(props: Props): JSX.Element {
    return (
        <Decorator {...props}>
            <CodeBlockLineInit {...props} />
        </Decorator>
    );
};
