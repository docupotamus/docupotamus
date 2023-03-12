import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useToolbar } from '../../contexts/toolbar';
import Tab from './Tab';

interface StyledBoxProps {
    readonly workbenchIsOpen: boolean;
};

const StyledBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'workbenchIsOpen',
})<StyledBoxProps>(({ workbenchIsOpen }) => ({
    height: '100vh',

    position: 'sticky',
    top: 0,

    display: workbenchIsOpen ? 'flex' : 'none',
    flexDirection: 'column',
    justifyContent: 'flex-start',

    backgroundColor: 'var(--ifm-background-color)',
    borderTopLeftRadius: 'var(--doc8-space-l-xl)',
    // TODO(dnguyen0304): Investigate refactoring to box-shadow style to reduce
    // complexity.
    '&::before': {
        '--box-shadow-width': 'var(--doc8-space-xs)',

        width: 'var(--box-shadow-width)',
        height: '100vh',

        position: 'absolute',
        top: 0,
        left: 'calc(-1 * var(--box-shadow-width))',

        content: '""',
        background: `linear-gradient(
            to right,
            transparent,
            rgba(60, 64, 67, 0.04) 70%,
            rgba(60, 64, 67, 0.07) 100%)`,
    },
}));

export default function Workbench(): JSX.Element {
    const { tabIdToConfig, activeTabId } = useToolbar();

    const tabConfig = tabIdToConfig.get(activeTabId);

    return (
        <StyledBox
            className='DocupotamusWorkbench'
            workbenchIsOpen={!!tabConfig}
        >
            {tabConfig &&
                <Tab displayName={tabConfig.displayName}>
                    {tabConfig.Component}
                </Tab>
            }
        </StyledBox >
    );
};
