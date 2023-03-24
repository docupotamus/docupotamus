import type { WrapperProps } from '@docusaurus/types';
import Tooltip from '@mui/material/Tooltip';
import CopyButtonInit from '@theme-original/CodeBlock/CopyButton';
import type CopyButtonType from '@theme/CodeBlock/CopyButton';
import * as React from 'react';
import styles from './styles.module.css';

type Props = Pick<WrapperProps<typeof CopyButtonType>, 'code'>;

export default function CopyButton({ code }: Props): JSX.Element {
    return (
        <Tooltip
            placement='top'
            title='Copy last active'
        >
            <div className={styles.CopyButton_layout}>
                <CopyButtonInit
                    className={styles.CopyButton}
                    code={code}
                />
            </div>
        </Tooltip>
    );
};
