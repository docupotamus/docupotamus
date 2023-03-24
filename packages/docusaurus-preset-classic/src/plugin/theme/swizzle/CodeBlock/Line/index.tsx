import type { WrapperProps } from '@docusaurus/types';
import CodeBlockLineInit from '@theme-init/CodeBlock/Line';
import type CodeBlockLineType from '@theme/CodeBlock/Line';
import {
    CodeBlockLineDecorator as CommonDecorator
} from '@theme/docupotamus-common';
import { CodeBlockLine } from '@theme/docupotamus-environment-variables';
import * as React from 'react';
import useIsEnabled from '../../../package/hooks/useIsEnabled';

type Props = Readonly<WrapperProps<typeof CodeBlockLineType>>;

export default function CodeBlockLineWrapper(props: Props): JSX.Element {
    const envVarsIsEnabled = useIsEnabled('envVars');

    return (
        <CommonDecorator {...props}>
            {envVarsIsEnabled
                ? <CodeBlockLine {...props} />
                : <CodeBlockLineInit {...props} />}
        </CommonDecorator>
    );
};
