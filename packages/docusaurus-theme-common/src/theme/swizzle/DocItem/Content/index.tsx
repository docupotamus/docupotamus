import type { WrapperProps } from '@docusaurus/types';
import DocItemContentInit from '@theme-init/DocItem/Content';
import type DocItemContentType from '@theme/DocItem/Content';
import * as React from 'react';
import Decorator from '../../../decorators/DocItem/Content';

type Props = Readonly<WrapperProps<typeof DocItemContentType>>;

export default function DocItemContentOverwrite(props: Props): JSX.Element {
    return (
        <Decorator>
            <DocItemContentInit {...props} />
        </Decorator>
    );
};
