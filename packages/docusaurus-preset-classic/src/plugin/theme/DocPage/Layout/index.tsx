import type { WrapperProps } from '@docusaurus/types';
import DocPageLayoutInit from '@theme-init/DocPage/Layout';
import type DocPageLayoutType from '@theme/DocPage/Layout';
import {
    DocPageLayoutDecorator as CommonDecorator
} from '@theme/docupotamus-common';
import * as React from 'react';

type Props = Readonly<WrapperProps<typeof DocPageLayoutType>>;

export default function DocPageLayoutWrapper(props: Props): JSX.Element {
    return (
        <CommonDecorator>
            <DocPageLayoutInit {...props} />
        </CommonDecorator>
    );
};
