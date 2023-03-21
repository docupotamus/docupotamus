import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import * as React from 'react';
import { useMarkdown } from '../../contexts/markdown';

interface Props {
    readonly children: React.ReactNode;
};

export default function CodeBlockObserver({ children }: Props): JSX.Element {
    const { directCodeBlockIndexes, setDirectChildren } = useMarkdown();

    // TODO(dnguyen0304): Fix performance by running only after all
    //   '[class*="codeBlockLines"] > *' have been rendered.
    React.useEffect(() => {
        if (!ExecutionEnvironment.canUseDOM) {
            return;
        }
        if (!directCodeBlockIndexes.length) {
            return;
        }
        const codeBlocks =
            Array.from(
                document.querySelectorAll(
                    '.theme-doc-markdown > .theme-code-block'));
        if (directCodeBlockIndexes.length !== codeBlocks.length) {
            return;
        }
        setDirectChildren(prev => {
            const newChildren = [...prev];
            for (let i = 0; i < directCodeBlockIndexes.length; ++i) {
                const codeBlockIndex = directCodeBlockIndexes[i];
                const codeBlock = codeBlocks[i];
                if (codeBlockIndex === undefined || codeBlock === undefined) {
                    break;
                }
                if (codeBlockIndex >= newChildren.length) {
                    break;
                }
                newChildren[codeBlockIndex] = codeBlock;
            }
            return newChildren;
        });
    }, [directCodeBlockIndexes]);

    return (
        <>
            {children}
        </>
    );
};
