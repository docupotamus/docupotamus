import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

const CLASS_NAME: string = 'zen-mode';
const CLASS_NAME_FOCUS: string = 'zen-focus';
// TODO(dnguyen0304): Investigate changing to vw units.
const MOUSE_RADIUS_PX: number = 200;

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

    const markdownElements = React.useRef<Array<HTMLElement>>([]);

    const toggleIsEnabled = () => setIsEnabled(prev => !prev);

    const handleMouseMove = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        const mouseClientY = event.clientY;
        const top = Math.max(mouseClientY - MOUSE_RADIUS_PX, 0);
        const bottom = mouseClientY + MOUSE_RADIUS_PX;

        markdownElements.current.forEach(element => {
            const rect = element.getBoundingClientRect();
            const afterTop = rect.top >= top;
            const beforeBottom = rect.bottom <= bottom;
            if (afterTop && beforeBottom) {
                element.classList.add(CLASS_NAME_FOCUS);
            } else {
                element.classList.remove(CLASS_NAME_FOCUS);
            }
        });
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

    React.useEffect(() => {
        // TODO(dnguyen0304): Fix not including code blocks with environment
        //   variables.
        // TODO(dnguyen0304): Investigate refactoring to use getElementAll.
        markdownElements.current = Array.from(
            document.querySelectorAll('.theme-doc-markdown > *'));
    }, []);

    return (
        <StyledBox
            className={clsx({ [`${CLASS_NAME}`]: isEnabled })}
            onMouseMove={handleMouseMove}
        >
            {children}
        </StyledBox>
    );
};
