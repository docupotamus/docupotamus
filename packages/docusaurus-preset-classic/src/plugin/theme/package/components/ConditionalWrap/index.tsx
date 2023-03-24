import * as React from 'react';

// TODO(dnguyen0304): Investigate extending React.FunctionComponent.
interface ComponentWithChildren {
    (props: { readonly children: React.ReactNode }): JSX.Element;
};

interface Props {
    readonly wrappers: {
        readonly Component: ComponentWithChildren;
        readonly props?: any;
        readonly isIncluded: boolean;
    }[];
    readonly children: React.ReactNode;
};

export default function ConditionalWrap(
    {
        wrappers,
        children,
    }: Props
): JSX.Element {
    // Base Case
    const innermost = wrappers.at(-1);
    const rest = wrappers.slice(0, -1);
    if (innermost === undefined) {
        return <>{children}</>;
    };

    return (
        (innermost.isIncluded)
            ?
            <ConditionalWrap wrappers={rest}>
                <innermost.Component {...innermost.props}>
                    {children}
                </innermost.Component>
            </ConditionalWrap>
            :
            <ConditionalWrap wrappers={rest}>
                {children}
            </ConditionalWrap>
    );
};
