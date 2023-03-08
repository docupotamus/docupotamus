import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import CloseButton from './CloseButton';

const Layout = styled(Box)({
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
});

const Header = styled(Box)({
    height: 'var(--ifm-navbar-height)',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'red',
    boxShadow: 'var(--ifm-navbar-shadow)',
    padding: `
        var(--ifm-navbar-padding-vertical)
        var(--ifm-navbar-padding-horizontal)`,
});

interface Props {
    readonly children: React.ReactNode;
    readonly displayName: string;
};

export default function Tab(
    {
        children,
        displayName,
    }: Props,
): JSX.Element {
    return (
        <Layout>
            <Header>
                <span>{displayName}</span>
                <CloseButton />
            </Header>
            <Box sx={{ flexGrow: 1 }}>
                {children}
            </Box>
        </Layout >
    );
};
