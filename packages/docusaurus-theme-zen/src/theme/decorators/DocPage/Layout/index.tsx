import type { WrapperProps } from '@docusaurus/types';
import type DocPageLayoutType from '@theme/DocPage/Layout';
import * as React from 'react';
import ZenMode from '../../../package/components/ZenMode';

type Props = Readonly<WrapperProps<typeof DocPageLayoutType>>;

// TODO(dnguyen0304): Investigate if the Workbench should be a child component.
export default function DocPageLayoutDecorator(
    {
        children,
    }: Props,
): JSX.Element {
    return (
        <ZenMode>
            {children}
        </ZenMode>
    );
};
