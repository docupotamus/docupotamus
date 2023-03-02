import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import Workbench from '../../../package/components/Workbench';

const Layout = styled(Box)({
    display: 'grid',
    gridAutoFlow: 'column',
    // TODO(dnguyen0304): Fix pre elements not overflowing at smaller screen
    //   sizes. See: https://css-tricks.com/preventing-a-grid-blowout/
    // TODO(dnguyen0304): Change to use fit-content for the sidebar so the text
    //   does not overflow at smaller screen sizes.
    gridAutoColumns: `
        minmax(0, 1fr)
        minmax(auto, 20vw)`,
});

interface Props {
    readonly children: React.ReactNode;
};

export default function LayoutDecorator({ children }: Props): JSX.Element {
    return (
        <Layout>
            {/* This is for backward-compatibility. */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                {children}
            </Box>
            <Workbench />
        </Layout>
    );
};
