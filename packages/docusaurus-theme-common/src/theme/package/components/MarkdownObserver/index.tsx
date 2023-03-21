import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import * as React from 'react';
import { useMarkdown } from '../../contexts/markdown';

interface Props {
    readonly children: React.ReactNode;
};

export default function MarkdownObserver({ children }: Props): JSX.Element {
    const { setDirectChildren } = useMarkdown();

    React.useEffect(() => {
        if (!ExecutionEnvironment.canUseDOM) {
            return;
        }
        // TODO(dnguyen0304): Fix not including code blocks.
        // TODO(dnguyen0304): Investigate refactoring to use getElementAll.
        const elements = document.querySelectorAll('.theme-doc-markdown > *');
        setDirectChildren(Array.from(elements));
    }, []);

    return (
        <>
            {children}
        </>
    );
};
