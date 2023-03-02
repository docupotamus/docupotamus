import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import styles from './styles.module.css';

export default function WorkbenchButton(): JSX.Element {
    return (
        <Box className={styles.WorkbenchButton_layout}>
            <Tooltip
                // Use a placement that does not overlap components with a hover
                // behavior.
                placement='right'
                title='Open in Workbench'
            >
                <IconButton
                    aria-label='open in workbench'
                    onClick={() => console.log('Not Yet Implemented')}
                >
                    <LoginOutlinedIcon />
                </IconButton>
            </Tooltip>
        </Box>
    );
};
