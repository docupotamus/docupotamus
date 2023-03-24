import type { WrapperProps } from '@docusaurus/types';
import DocPageLayoutInit from '@theme-init/DocPage/Layout';
import type DocPageLayoutType from '@theme/DocPage/Layout';
import {
    DocPageLayoutDecorator as CommonDecorator
} from '@theme/docupotamus-common';
import {
    DocPageLayoutDecorator as ZenDecorator
} from '@theme/docupotamus-zen';
import * as React from 'react';
import ConditionalWrap from '../../../package/components/ConditionalWrap';
import useIsEnabled from '../../../package/hooks/useIsEnabled';

type Props = Readonly<WrapperProps<typeof DocPageLayoutType>>;

export default function DocPageLayoutWrapper(props: Props): JSX.Element {
    const isEnabledZen = useIsEnabled('zen');

    return (
        <ConditionalWrap wrappers={[
            {
                Component: CommonDecorator,
                props,
                isIncluded: true,
            },
            {
                Component: ZenDecorator,
                props,
                isIncluded: isEnabledZen,
            },
        ]}>
            <DocPageLayoutInit {...props} />
        </ConditionalWrap>
    );
};
