import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useToolbar } from '../../contexts/toolbar';
import Button from './Button';

const StyledBox = styled(Box)({
    // TODO(dnguyen0304): Fix missing responsive layout.
    width: '110px',
    height: 'calc(100vh - var(--ifm-navbar-height))',

    position: 'sticky',
    top: 'var(--ifm-navbar-height)',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    borderLeft: '1px solid var(--ifm-toc-border-color)',
    // TODO(dnguyen0304): Add paddingRight for the scrollbar.
    paddingTop: 'var(--doc8-space-s)',
});

export default function Toolbar(): JSX.Element {
    const { tabIdToConfig } = useToolbar();

    return (
        <StyledBox>
            {/* TODO(dnguyen0304): Replace temporary placeholder stub. */}
            <React.Suspense fallback='Loading...'>
                {[...tabIdToConfig.entries()].map(([tabId, config]) => {
                    return (
                        <Button
                            key={tabId}
                            tabId={tabId}
                        >
                            <config.IconComponent />
                        </Button>
                    );
                })}
            </React.Suspense>
        </StyledBox>
    );
};
