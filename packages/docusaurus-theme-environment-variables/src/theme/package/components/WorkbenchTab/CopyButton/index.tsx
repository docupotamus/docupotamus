import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
// import type { WrapperProps } from '@docusaurus/types';
import CopyButtonInit from '@theme-original/CodeBlock/CopyButton';
// import type CopyButtonType from '@theme/CodeBlock/CopyButton';
import * as React from 'react';
import styles from './styles.module.css';

// TODO(dnguyen0304): Investigate adding border styles similar to how
//   @theme/CodeBlock does.
const StyledBox = styled(Box)({
    width: 'var(--doc8-space-l)',
    aspectRatio: '1 / 1',
    alignSelf: 'center',
});

// type Props = WrapperProps<typeof CopyButtonType>;

export default function CopyButton(): JSX.Element {
    return (
        <Tooltip
            placement='top'
            title='Copy last active'
        >
            <StyledBox>
                {/* <CopyButton {...props} /> */}
                <CopyButtonInit
                    className={styles.CopyButton}
                    code={'temporary placeholder'}
                />
            </StyledBox>
        </Tooltip>
    );
};
