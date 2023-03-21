import type { WrapperProps } from '@docusaurus/types';
import type CodeBlockLineType from '@theme/CodeBlock/Line';
import {
    CodeBlockLineDecorator as CommonDecorator
} from '@theme/docupotamus-common';
import { CodeBlockLine } from '@theme/docupotamus-environment-variables';
import * as React from 'react';

type Props = Readonly<WrapperProps<typeof CodeBlockLineType>>;

export default function CodeBlockLineWrapper(props: Props): JSX.Element {
    return (
        <CommonDecorator {...props}>
            <CodeBlockLine {...props} />
        </CommonDecorator>
    );
};
