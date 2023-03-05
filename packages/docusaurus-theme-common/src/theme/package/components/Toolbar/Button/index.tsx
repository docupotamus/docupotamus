import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import { useToolbar } from '../../../contexts/toolbar';

interface Props {
    readonly tabId: string;
    readonly displayName: string;
    readonly children: React.ReactNode;
};

export default function Button(
    {
        tabId,
        displayName,
        children,
    }: Props
): JSX.Element {
    const { setActiveTabId } = useToolbar();

    const handleClick = () => {
        setActiveTabId(prev => (prev === tabId) ? '' : tabId);
    };

    return (
        <Tooltip
            placement='left'
            title={`Toggle ${displayName}`}
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
