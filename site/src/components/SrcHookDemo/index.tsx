import { useLocation } from '@docusaurus/router';
import CodeBlock from '@theme/CodeBlock';
import {
    usePathToContent
} from '@theme/docupotamus-plugin-content-docs-src-hook';
import * as React from 'react';

const EXCERPT_LENGTH: number = 500;

export default function SrcHookDemo(): JSX.Element {
    const { pathname } = useLocation();
    const { pathToContent } = usePathToContent();

    const getRawContent = (): string => {
        const rawContent = pathToContent[pathname] ?? '';
        if (!rawContent) {
            console.warn(`Raw content not found for path "${pathname}".`);
            return '';
        }
        return rawContent.slice(0, EXCERPT_LENGTH);
    };

    return (
        <CodeBlock
            language='text'
            title={`Path: ${pathname}`}
        >
            {getRawContent()}
        </CodeBlock>
    );
};
