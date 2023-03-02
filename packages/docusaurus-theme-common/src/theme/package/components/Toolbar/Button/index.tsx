import IconButton from '@mui/material/IconButton';
import * as React from 'react';
import { useToolbar } from '../../../contexts/toolbar';

interface Props {
    readonly children: React.ReactNode;
    readonly tabId: string;
};

export default function Button(
    {
        children,
        tabId,
    }: Props
): JSX.Element {
    const { setActiveTabId } = useToolbar();

    const handleClick = () => {
        setActiveTabId(prev => (prev === tabId) ? '' : tabId);
    };

    return (
        <IconButton onClick={handleClick}>
            {children}
        </IconButton>
    );
};
