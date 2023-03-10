// import type { WrapperProps } from '@docusaurus/types';
import CopyButtonInit from '@theme-original/CodeBlock/CopyButton';
// import type CopyButtonType from '@theme/CodeBlock/CopyButton';
import * as React from 'react';
import styles from './styles.module.css';

// type Props = WrapperProps<typeof CopyButtonType>;

export default function CopyButton(): JSX.Element {
    return (
        // <CopyButton {...props} />
        <CopyButtonInit className={styles.CopyButton} />
    );
};
