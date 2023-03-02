import type { WrapperProps } from '@docusaurus/types';
import DocPageLayoutMainInit from '@theme-init/DocPage/Layout/Main';
import type DocPageLayoutMainType from '@theme/DocPage/Layout/Main';
import {
    DocPageLayoutMainDecorator as CommonDecorator
} from '@theme/docupotamus-common';
import * as React from 'react';

type Props = Readonly<WrapperProps<typeof DocPageLayoutMainType>>;

export default function DocPageLayoutMainWrapper(props: Props): JSX.Element {
    return (
        <CommonDecorator hiddenSidebarContainer={props.hiddenSidebarContainer}>
            <DocPageLayoutMainInit {...props} />
        </CommonDecorator>
    );
};
