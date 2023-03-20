import type { WrapperProps } from '@docusaurus/types';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import type DocPageLayoutType from '@theme/DocPage/Layout';
import clsx from 'clsx';
import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

const StyledBox = styled(Box)({});

type Props = Readonly<WrapperProps<typeof DocPageLayoutType>>;

export default function DocPageLayoutDecorator(
    {
        children,
    }: Props,
): JSX.Element {
    const [isEnabled, setIsEnabled] = React.useState<boolean>(false);

    const toggleIsEnabled = () => setIsEnabled(prev => !prev);

    useHotkeys(
        "shift",
        toggleIsEnabled,
        {
            description: 'Enable zen mode',
            keydown: true,
            keyup: false,
        },
    );
    useHotkeys(
        "shift",
        toggleIsEnabled,
        {
            description: 'Disable zen mode',
            keydown: false,
            keyup: true,
        },
    );

    return (
        // TODO(dnguyen0304): Extract to package.
        <StyledBox className={clsx({ 'zen-mode': isEnabled })}>
            {children}
        </StyledBox>
    );
};
