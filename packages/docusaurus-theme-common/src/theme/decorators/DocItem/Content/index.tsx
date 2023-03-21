import type { WrapperProps } from '@docusaurus/types';
import type DocItemContentType from '@theme/DocItem/Content';
import * as React from 'react';
import { useMarkdown } from '../../../package/contexts/markdown';

type Props = Readonly<WrapperProps<typeof DocItemContentType>>;

export default function DocItemContentDecorator(
    {
        children,
    }: Props
): JSX.Element {
    const { setDirectChildren } = useMarkdown();

    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (ref.current === null) {
            // This should not be possible.
            return;
        }
        // TODO(dnguyen0304): Fix not including code blocks.
        // TODO(dnguyen0304): Investigate refactoring to use getElementAll.
        const elements = ref
            .current
            .querySelectorAll('.theme-doc-markdown > *');
        setDirectChildren(Array.from(elements));
    }, []);

    return (
        <div ref={ref}>
            {children}
        </div>
    );
};
