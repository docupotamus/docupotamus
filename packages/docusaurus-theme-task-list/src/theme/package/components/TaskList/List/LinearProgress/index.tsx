import Box from '@mui/material/Box';
import MuiLinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import useTaskListThemeConfig from '../../../../hooks/useTaskListThemeConfig';

interface StyledBoxProps {
    readonly barColor: React.CSSProperties['color'];
};

const StyledBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'barColor'
})<StyledBoxProps>(({ barColor }) => ({
    width: '100%',
    '&.MuiBox-root .MuiLinearProgress-bar': {
        backgroundColor: barColor,
    },
    '&.MuiBox-root .MuiLinearProgress-root::before': {
        backgroundColor: barColor,
    },
}));

const StyledText = styled('p')({
    minWidth: '5ch',

    fontSize: 'var(--d9s-font-size--1)',
    margin: 0,
});

interface Props extends LinearProgressProps {
    readonly value: number;
};

export default function LinearProgress(props: Props): JSX.Element {
    const {
        progressBar: {
            color: barColor,
        },
    } = useTaskListThemeConfig();

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
        }}>
            <StyledBox barColor={barColor}>
                <MuiLinearProgress
                    // This is a fallback. Set color in the styled component for
                    // higher specificity.
                    color='inherit'
                    variant='determinate'
                    {...props}
                />
            </StyledBox>
            <StyledText>
                {`${Math.round(props.value)}%`}
            </StyledText>
        </Box>
    );
};
