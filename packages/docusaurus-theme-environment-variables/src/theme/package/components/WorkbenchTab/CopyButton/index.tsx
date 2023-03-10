import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
// import type { WrapperProps } from '@docusaurus/types';
import CopyButtonInit from '@theme-original/CodeBlock/CopyButton';
// import type CopyButtonType from '@theme/CodeBlock/CopyButton';
import * as React from 'react';
import styles from './styles.module.css';

const StyledBox = styled(Box)({
    width: '3rem',
    aspectRatio: '1 / 1',
});

// type Props = WrapperProps<typeof CopyButtonType>;

export default function CopyButton(): JSX.Element {
    return (
        <StyledBox>
            {/* <CopyButton {...props} /> */}
            <CopyButtonInit
                className={styles.CopyButton}
                code={'temporary placeholder'}
            />
        </StyledBox>
    );
};
