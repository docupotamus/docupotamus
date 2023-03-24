// TODO(dnguyen0304): Add to getSwizzleComponentList.

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
