import * as React from 'react';

const DELIMITER: string = '- [ ] ';

// Copied from: https://github.com/facebook/docusaurus/blob/a308fb7c81832cca354192fe2984f52749441249/packages/docusaurus-theme-classic/src/theme/CodeBlock/index.tsx#L20
const stringifyChildren = (children: React.ReactNode): string => {
    const hasElement =
        React.Children
            .toArray(children)
            .some((child) => React.isValidElement(child));
    if (hasElement) {
        throw new Error(
            'rendering non-text nodes in a task list is not yet supported'
        );
    }
    return Array.isArray(children) ? children.join('') : (children as string);
};

export default function useLabelsParsed(
    children: React.ReactNode,
): string[] {
    const [labels, setLabels] = React.useState<string[]>([]);

    React.useEffect(() => {
        const stringified = stringifyChildren(children);
        const newLabels =
            stringified
                .split(DELIMITER)
                .filter(item => item.length);
        setLabels(newLabels);
    }, []);

    return labels;
};
