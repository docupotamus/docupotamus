import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

const CLASS_NAME: string = 'zen-mode';

const StyledBox = styled(Box)({
    [`&.${CLASS_NAME} *`]: {
        opacity: 0.85,
        transition: `
            opacity
            var(--ifm-transition-fast)
            var(--ifm-transition-timing-default)`,
    },
});

interface Props {
    children: React.ReactNode;
};

export default function ZenMode({ children }: Props): JSX.Element {
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
        <StyledBox className={clsx({ [`${CLASS_NAME}`]: isEnabled })}>
            {children}
        </StyledBox>
    );
};
