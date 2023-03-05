import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';

export default function CloseButton(): JSX.Element {
    return (
        <Tooltip
            placement='bottom'
            title='Close Workbench'
        >
            <IconButton
                aria-label='close workbench'
                color='inherit'
                onClick={() => { }}
            >
                <CloseIcon />
            </IconButton>
        </Tooltip>
    );
};
