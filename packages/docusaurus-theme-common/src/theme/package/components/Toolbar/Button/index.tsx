import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import { useToolbar } from '../../../contexts/toolbar';

interface Props {
    readonly children: React.ReactNode;
    readonly tabId: string;
    readonly displayName: string;
};

export default function Button(
    {
        children,
        tabId,
        displayName,
    }: Props
): JSX.Element {
    const { _internalSetActiveTabId } = useToolbar();

    const handleClick = () => {
        _internalSetActiveTabId(prev => (prev === tabId) ? '' : tabId);
    };

    return (
        <Tooltip
            placement='left'
            title={displayName}
        >
            <IconButton
                color='inherit'
                onClick={handleClick}
            >
                {children}
            </IconButton>
        </Tooltip>
    );
};
