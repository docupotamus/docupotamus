import type { WrapperProps } from '@docusaurus/types';
import DocItemContent from '@theme-init/DocItem/Content';
import type DocItemContentType from '@theme/DocItem/Content';
import {
    DocItemContentDecorator as CommonDecorator
} from '@theme/docupotamus-common';
import * as React from 'react';

type Props = Readonly<WrapperProps<typeof DocItemContentType>>;

export default function DocItemContentWrapper(props: Props): JSX.Element {
    return (
        <CommonDecorator {...props}>
            <DocItemContent {...props} />
        </CommonDecorator>
    );
};
