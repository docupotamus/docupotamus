import type { WrapperProps } from '@docusaurus/types';
import Box from '@mui/material/Box';
import type DocPageLayoutType from '@theme/DocPage/Layout';
import * as React from 'react';

type Props = Readonly<WrapperProps<typeof DocPageLayoutType>>;

export default function DocPageLayoutDecorator(
    {
        children,
    }: Props,
): JSX.Element {
    return (
        <Box>
            {children}
        </Box>
    );
};
