import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';

const Layout = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
});

interface Props {
    readonly onPreviousClick: () => void;
    readonly onNextClick: () => void;
    readonly onScrollToClick: () => void;
};

export default function ButtonGroup(
    {
        onPreviousClick,
        onNextClick,
        onScrollToClick,
    }: Props
): JSX.Element {
    return (
        <Layout>
            <Tooltip
                placement='top-start'
                // Do not use kbd because it makes the font too small.
                title={<>(&larr;) Previous Task List</>}
            >
                <IconButton
                    aria-label='previous task list'
                    color='inherit'
                    onClick={onPreviousClick}
                >
                    <KeyboardArrowLeftOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Tooltip
                placement='top'
                title='Scroll to Task List'
            >
                <IconButton
                    aria-label='scroll to task list'
                    color='inherit'
                    onClick={onScrollToClick}
                >
                    <TagOutlinedIcon sx={{ transform: 'skewX(-10deg)' }} />
                </IconButton>
            </Tooltip>
            <Tooltip
                placement='top-end'
                // Do not use kbd because it makes the font too small.
                title={<>Next Task List (&rarr;)</>}
            >
                <IconButton
                    aria-label='next task list'
                    color='inherit'
                    onClick={onNextClick}
                >
                    <KeyboardArrowRightOutlinedIcon />
                </IconButton>
            </Tooltip>
        </Layout>
    );
};
