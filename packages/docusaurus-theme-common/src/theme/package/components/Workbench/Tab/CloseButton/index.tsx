import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import { useToolbar } from '../../../../contexts/toolbar';

export default function CloseButton(): JSX.Element {
    const { _internalSetActiveTabId } = useToolbar();

    return (
        <Tooltip
            placement='bottom-end'
            title='Close Workbench'
        >
            <IconButton
                aria-label='close workbench'
                color='inherit'
                onClick={() => _internalSetActiveTabId('')}
            >
                <CloseIcon />
            </IconButton>
        </Tooltip>
    );
};
