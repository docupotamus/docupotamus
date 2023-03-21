import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import * as React from 'react';
import { useMarkdown } from '../../contexts/markdown';

interface Props {
    readonly children: React.ReactNode;
};

export default function MarkdownObserver({ children }: Props): JSX.Element {
    const { _internalSetDirectChildren } = useMarkdown();

    // TODO(dnguyen0304): Investigate fixing performance from O(codeBlockCount)
    //   to O(1).
    React.useEffect(() => {
        if (!ExecutionEnvironment.canUseDOM) {
            return;
        }
        // TODO(dnguyen0304): Investigate refactoring to use getElementAll.
        _internalSetDirectChildren(
            Array.from(document.querySelectorAll('.theme-doc-markdown > *')));
    }, []);

    return (
        <>
            {children}
        </>
    );
};
