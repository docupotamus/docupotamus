import type { WrapperProps } from '@docusaurus/types';
import DocPageInit from '@theme-init/DocPage';
import type DocPageType from '@theme/DocPage';
import {
    DocPageDecorator as SrcHookDecorator
} from '@theme/docupotamus-plugin-content-docs-src-hook';
import * as React from 'react';

type Props = Readonly<WrapperProps<typeof DocPageType>>;

export default function DocPageWrapper(props: Props): JSX.Element {
    return (
        <SrcHookDecorator {...props}>
            <DocPageInit {...props} />
        </SrcHookDecorator>
    );
};
