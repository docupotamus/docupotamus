// Warning: This module was ejected. Do not fix or format, and minimize changes
// to facilitate diffing.

import PartitionedLineTokens from '../../PartitionedLineTokens';

import * as React from 'react';
import clsx from 'clsx';
import type {Props} from '@theme/CodeBlock/Line';

import styles from './styles.module.css';

export default function CodeBlockLine({
  line,
  classNames,
  showLineNumbers,
  getLineProps,
  getTokenProps,
}: Props): JSX.Element {
  if (line.length === 1 && line[0]!.content === '\n') {
    line[0]!.content = '';
  }

  const lineProps = getLineProps({
    line,
    className: clsx(classNames, showLineNumbers && styles.codeLine),
  });

  // This is the only difference after ejecting.
  const lineTokens = (
    <PartitionedLineTokens
        line={line}
        getTokenProps={getTokenProps}
    />
  );

  return (
    <span {...lineProps}>
      {showLineNumbers ? (
        <>
          <span className={styles.codeLineNumber} />
          <span className={styles.codeLineContent}>{lineTokens}</span>
        </>
      ) : (
        lineTokens
      )}
      <br />
    </span>
  );
}
