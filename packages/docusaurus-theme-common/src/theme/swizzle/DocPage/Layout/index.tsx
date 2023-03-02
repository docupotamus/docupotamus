import type { WrapperProps } from '@docusaurus/types';
import Layout from '@theme-init/DocPage/Layout';
import type LayoutType from '@theme/DocPage/Layout';
import * as React from 'react';
import Decorator from '../../../decorators/DocPage/Layout';

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): JSX.Element {
    return (
        <Decorator>
            <Layout {...props} />
        </Decorator>
    );
};
