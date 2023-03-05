/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useHistory } from '@docusaurus/router';
import React, {
    type ComponentProps,
    type ReactElement,
    type ReactNode
} from 'react';
import styles from './styles.module.css';

// ReactNode equivalent of HTMLElement#innerText
const getText = (node: ReactElement): string => {
    let curNode: ReactNode = node;
    while (React.isValidElement(curNode)) {
        [curNode] = React.Children.toArray(curNode.props.children);
    }
    return curNode as string;
};

interface ApiTableRowProps {
    readonly children: ReactElement<ComponentProps<'tr'>>;
    readonly name: string | undefined;
};

const ApiTableRow = (
    {
        children,
        name,
    }: ApiTableRowProps,
    ref: React.ForwardedRef<HTMLTableRowElement>,
): JSX.Element => {
    const entryName = getText(children);
    const id = name ? `${name}-${entryName}` : entryName;
    const anchor = `#${id}`;
    const history = useHistory();
    return (
        <tr
            ref={history.location.hash === anchor ? ref : undefined}
            id={id}
            onClick={() => history.push(anchor)}
            onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter') {
                    history.push(anchor);
                }
            }}
            tabIndex={0}
        >
            {children.props.children}
        </tr>
    );
};

const ApiTableRowComp = React.forwardRef(ApiTableRow);

interface Props {
    readonly children: ReactElement<ComponentProps<'table'>>;
    readonly name?: string;
};

/*
 * Note: this is not a quite robust component since it makes a lot of
 * assumptions about how the children looks; however, those assumptions
 * should be generally correct in the MDX context.
 */
export default function APITable({ children, name }: Props): JSX.Element {
    const highlightedRow = React.useRef<HTMLTableRowElement>(null);

    const [thead, tbody] = React.Children.toArray(children.props.children) as [
        ReactElement<{ children: ReactElement[] }>,
        ReactElement<{ children: ReactElement[] }>,
    ];
    const rows = React.Children.map(
        tbody.props.children,
        (row: ReactElement<ComponentProps<'tr'>>) => (
            <ApiTableRowComp name={name} ref={highlightedRow}>
                {row}
            </ApiTableRowComp>
        ),
    );

    React.useEffect(() => {
        highlightedRow.current?.focus();
    }, [highlightedRow]);

    return (
        <table className={styles.apiTable}>
            {thead}
            <tbody>{rows}</tbody>
        </table>
    );
};
