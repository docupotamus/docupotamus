import type { WrapperProps } from '@docusaurus/types';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import CopyButtonInit from '@theme-original/CodeBlock/CopyButton';
import type CopyButtonType from '@theme/CodeBlock/CopyButton';
import * as React from 'react';
import styles from './styles.module.css';

// TODO(dnguyen0304): Investigate adding border styles similar to how
//   @theme/CodeBlock does.
const StyledBox = styled(Box)({
    width: 'var(--doc8-space-l)',
    aspectRatio: '1 / 1',
    alignSelf: 'center',
});

type Props = Pick<WrapperProps<typeof CopyButtonType>, 'code'>;

export default function CopyButton({ code }: Props): JSX.Element {
    return (
        <Tooltip
            placement='top'
            title='Copy last active'
        >
            <StyledBox>
                <CopyButtonInit
                    className={styles.CopyButton}
                    code={code}
                />
            </StyledBox>
        </Tooltip>
    );
};
