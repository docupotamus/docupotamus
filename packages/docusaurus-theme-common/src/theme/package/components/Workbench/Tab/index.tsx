import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const Layout = styled(Box)({
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
});

const Header = styled(Box)({
    height: 'var(--ifm-navbar-height)',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    boxShadow: 'var(--ifm-navbar-shadow)',
    padding: `
        var(--ifm-navbar-padding-vertical)
        var(--ifm-navbar-padding-horizontal)`,
    '& > *': {
        borderTopLeftRadius: 'inherit',
    },
});

interface Props {
    readonly children: React.ReactNode;
};

export default function Tab({ children }: Props): JSX.Element {
    return (
        <Layout>
            <Header>
                Task List
            </Header>
            <Box sx={{ flexGrow: 1 }}>
                {children}
            </Box>
        </Layout>
    );
};
