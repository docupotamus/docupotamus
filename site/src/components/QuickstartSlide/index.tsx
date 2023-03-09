import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const StyledBox = styled(Box)({
    '& h2': {
        backgroundColor: 'var(--ifm-color-primary)',
        fontSize: 'var(--doc8-font-size-4)',
        lineHeight: 1.4,
        margin: 0,
        padding: 'var(--doc8-space-xl)',
    },
    '& h2 > span.slide_text__emphasis': {
        color: 'var(--ifm-color-content-inverse)',
    },
});

export default function QuickstartSlide(): JSX.Element {
    return (
        <StyledBox>
            <h2>Documentation <span className='slide_text__emphasis'>plugins</span> to make you <span className='slide_text__emphasis'>faster.</span></h2>
        </StyledBox>
    );
};
