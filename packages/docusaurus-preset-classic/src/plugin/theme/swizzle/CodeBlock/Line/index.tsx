import type { WrapperProps } from '@docusaurus/types';
import CodeBlockLineInit from '@theme-init/CodeBlock/Line';
import type CodeBlockLineType from '@theme/CodeBlock/Line';
import { CodeBlockLine } from '@theme/docupotamus-codeblock-param';
import {
    CodeBlockLineDecorator as CommonDecorator
} from '@theme/docupotamus-common';
import * as React from 'react';
import useIsEnabled from '../../../package/hooks/useIsEnabled';

type Props = Readonly<WrapperProps<typeof CodeBlockLineType>>;

export default function CodeBlockLineWrapper(props: Props): JSX.Element {
    const paramIsEnabled = useIsEnabled('param');

    return (
        <CommonDecorator {...props}>
            {paramIsEnabled
                ? <CodeBlockLine {...props} />
                : <CodeBlockLineInit {...props} />}
        </CommonDecorator>
    );
};
