import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

const CLASS_NAME_ROOT: string = 'zen_root';
const CLASS_NAME_FOCUS: string = 'zen_focus';
// TODO(dnguyen0304): Investigate changing to vw units.
// TODO(dnguyen0304): Extract to configuration setting.
const MOUSE_RADIUS_PX: number = 100;

const StyledBox = styled(Box)({
    position: 'relative',

    [`&.${CLASS_NAME_ROOT}`]: {
        [[
            // List selectors explicitly so we can add or remove class names
            // more easily. We need this approach because switching between
            // opacity: 0 and opacity: 1 is not sufficient. We need to "revert"
            // adding the opacity: 0 property.
            '& > .navbar',
            '& > .footer',
            '& .theme-doc-sidebar-container',
            '& .theme-doc-toc-desktop',
            '& article > *:not(.theme-doc-markdown)',
            `& article > .theme-doc-markdown > *:not(.${CLASS_NAME_FOCUS})`,
            '& .pagination-nav',
        ].join(', ')]: {
            // There is an unaccounted for edge case where styles with a smaller
            // opacity value actually become more visible.
            opacity: 0.05,
            transition: `
                opacity
                var(--ifm-transition-fast)
                var(--ifm-transition-timing-default)`,
        },
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
        const top = Math.max(event.clientY - MOUSE_RADIUS_PX, 0);
        const bottom = event.clientY + MOUSE_RADIUS_PX;

        markdownElements.current.forEach(element => {
            const rect = element.getBoundingClientRect();
            const afterTop = rect.bottom >= top;
            const beforeBottom = rect.top <= bottom;
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
        // TODO(dnguyen0304): Fix not updating on location change.
        // TODO(dnguyen0304): Fix not including code blocks with environment
        //   variables.
        // TODO(dnguyen0304): Investigate refactoring to use getElementAll.
        markdownElements.current = Array.from(
            document.querySelectorAll('.theme-doc-markdown > *'));
    }, []);

    return (
        <StyledBox
            className={clsx({ [`${CLASS_NAME_ROOT}`]: isEnabled })}
            onMouseMove={handleMouseMove}
        >
            {children}
        </StyledBox>
    );
};
