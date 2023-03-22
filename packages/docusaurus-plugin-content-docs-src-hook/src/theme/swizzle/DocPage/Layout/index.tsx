import type { WrapperProps } from '@docusaurus/types';
import DocPageLayoutInit from '@theme-init/DocPage/Layout';
import type DocPageLayoutType from '@theme/DocPage/Layout';
import * as React from 'react';
import Decorator from '../../../decorator/DocPage/Layout';

type Props = Readonly<WrapperProps<typeof DocPageLayoutType>>;

export default function DocPageLayoutOverwrite(props: Props): JSX.Element {
    return (
        <Decorator {...props}>
            <DocPageLayoutInit {...props} />
        </Decorator>
    );
};
