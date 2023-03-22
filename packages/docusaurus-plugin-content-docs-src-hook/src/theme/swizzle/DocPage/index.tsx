import type { WrapperProps } from '@docusaurus/types';
import DocPageInit from '@theme-init/DocPage';
import type DocPageType from '@theme/DocPage';
import * as React from 'react';
import Decorator from '../../decorator/DocPage';

type Props = Readonly<WrapperProps<typeof DocPageType>>;

export default function DocPageOverwrite(props: Props): JSX.Element {
    return (
        <Decorator {...props}>
            <DocPageInit {...props} />
        </Decorator>
    );
};
