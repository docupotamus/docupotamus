import type { WrapperProps } from '@docusaurus/types';
import DocPageLayoutMainInit from '@theme-init/DocPage/Layout/Main';
import type DocPageLayoutMainType from '@theme/DocPage/Layout/Main';
import * as React from 'react';
import Decorator from '../../../../decorators/DocPage/Layout/Main';

type Props = Readonly<WrapperProps<typeof DocPageLayoutMainType>>;

export default function DocPageLayoutMainWrapper(props: Props): JSX.Element {
    return (
        <Decorator>
            <DocPageLayoutMainInit {...props} />
        </Decorator>
    );
};
