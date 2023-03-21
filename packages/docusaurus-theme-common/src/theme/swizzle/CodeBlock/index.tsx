import type { WrapperProps } from '@docusaurus/types';
import CodeBlockInit from '@theme-init/CodeBlock';
import type CodeBlockType from '@theme/CodeBlock';
import * as React from 'react';
import Decorator from '../../decorators/CodeBlock';

type Props = Readonly<WrapperProps<typeof CodeBlockType>>;

export default function CodeBlockOverwrite(props: Props): JSX.Element {
    return (
        <Decorator {...props}>
            <CodeBlockInit {...props} />
        </Decorator>
    );
};
