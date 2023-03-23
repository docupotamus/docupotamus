import { useLocation } from '@docusaurus/router';
import CodeBlock from '@theme/CodeBlock';
import { useRawContent } from '@theme/docupotamus-plugin-content-docs-src-hook';
import * as React from 'react';

const EXCERPT_LENGTH: number = 500;

export default function SrcHookDemo(): JSX.Element {
    const { pathname } = useLocation();
    const { rawContent } = useRawContent();

    const getContent = (): string => {
        const currentContent = rawContent[pathname] ?? '';
        if (!currentContent) {
            console.warn(`Content not found for path "${pathname}".`);
            return '';
        }
        return currentContent.slice(0, EXCERPT_LENGTH);
    };

    return (
        <CodeBlock
            language='text'
            title={`Path: ${pathname}`}
        >
            {getContent()}
        </CodeBlock>
    );
};
