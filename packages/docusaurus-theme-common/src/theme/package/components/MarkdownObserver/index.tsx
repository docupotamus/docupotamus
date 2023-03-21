import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import * as React from 'react';
import { useMarkdown } from '../../contexts/markdown';

interface Props {
    readonly children: React.ReactNode;
};

export default function MarkdownObserver({ children }: Props): JSX.Element {
    const { setDirectChildren, setCodeBlockIndexes } = useMarkdown();

    React.useEffect(() => {
        if (!ExecutionEnvironment.canUseDOM) {
            return;
        }
        // TODO(dnguyen0304): Investigate refactoring to use getElementAll.
        const elements =
            Array.from(document.querySelectorAll('.theme-doc-markdown > *'));
        setDirectChildren(elements);
        setCodeBlockIndexes(
            elements
                .map(x => x.classList.contains('theme-code-block'))
                .map((y, index) => y ? index : null)
                // See: https://stackoverflow.com/a/59726888
                .flatMap(z => z ? [z] : [])
        );
    }, []);

    return (
        <>
            {children}
        </>
    );
};
