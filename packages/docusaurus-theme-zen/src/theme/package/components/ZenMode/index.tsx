import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

const CLASS_NAME: string = 'zen-mode';
// const MOUSE_RADIUS: React.CSSProperties['width'] = '10vw';

const StyledBox = styled(Box)({
    position: 'relative',

    [`&.${CLASS_NAME} *`]: {
        // TODO(dnguyen0304): Fix overriding smaller opacity values.
        opacity: 0.8,
        transition: `
            opacity
            var(--ifm-transition-fast)
            var(--ifm-transition-timing-default)`,
    },
});

// const Intersector = styled(Box)({
//     width: `calc(2 * ${MOUSE_RADIUS})`,
//     height: `calc(2 * ${MOUSE_RADIUS})`,

//     position: 'absolute',

//     borderRadius: '50%',
//     translate: `-${MOUSE_RADIUS} -${MOUSE_RADIUS}`,

//     // TODO(dnguyen0304): Remove development code.
//     backgroundColor: 'red',
//     zIndex: 9999999,
// });

interface Props {
    children: React.ReactNode;
};

export default function ZenMode({ children }: Props): JSX.Element {
    const [isEnabled, setIsEnabled] = React.useState<boolean>(false);

    const intersectorPosition = React.useRef<{
        topPx: number,
        leftPx: number,
    }>({
        topPx: 0,
        leftPx: 0,
    });

    const toggleIsEnabled = () => setIsEnabled(prev => !prev);

    const handleMouseMove = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        intersectorPosition.current = {
            topPx: event.pageY,
            leftPx: event.pageX,
        };
        console.log(intersectorPosition.current);
    };

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
        <StyledBox
            className={clsx({ [`${CLASS_NAME}`]: isEnabled })}
            onMouseMove={handleMouseMove}
        >
            {children}
        </StyledBox>
    );
};
