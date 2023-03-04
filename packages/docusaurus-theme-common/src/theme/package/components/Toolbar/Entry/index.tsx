// TODO(dnguyen0304): Add to getSwizzleComponentList.
// This is a sentinel to be swizzled through wrapping. It is guaranteed to be a
// descendant component of the ToolbarProvider and therefore has always access
// to the context.

import * as React from 'react';

interface Props {
    readonly children: React.ReactNode;
};

export default function Entry({ children }: Props): JSX.Element {
    return (
        <>
            {children}
        </>
    );
};
