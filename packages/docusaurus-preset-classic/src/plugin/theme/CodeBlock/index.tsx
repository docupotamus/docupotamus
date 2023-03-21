import type { WrapperProps } from '@docusaurus/types';
import CodeBlock from '@theme-init/CodeBlock';
import type CodeBlockType from '@theme/CodeBlock';
import {
    CodeBlockDecorator as CommonDecorator
} from '@theme/docupotamus-common';
import * as React from 'react';

type Props = Readonly<WrapperProps<typeof CodeBlockType>>;

export default function CodeBlockWrapper(props: Props): JSX.Element {
    return (
        <CommonDecorator{...props}>
            <CodeBlock {...props} />
        </CommonDecorator >
    );
};
