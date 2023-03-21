import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useMarkdown } from '@theme/docupotamus-common';
import clsx from 'clsx';
import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import useZenThemeConfig from '../../hooks/useZenThemeConfig';

const CLASS_NAME_ROOT: string = 'zen_root';
const CLASS_NAME_FOCUS: string = 'zen_focus';

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

const hasAnyIntersection = (
    clientY: number,
    radiusPx: number,
    targetRect: Pick<DOMRect, 'top' | 'bottom'>,
): boolean => {
    const top = Math.max(clientY - radiusPx, 0);
    const bottom = clientY + radiusPx;
    const afterTop = targetRect.bottom >= top;
    const beforeBottom = targetRect.top <= bottom;
    return afterTop && beforeBottom;
};

interface Props {
    children: React.ReactNode;
};

export default function ZenMode({ children }: Props): JSX.Element {
    const { visibilityRadiusPx } = useZenThemeConfig();
    const { directChildren } = useMarkdown();
    const [isEnabled, setIsEnabled] = React.useState<boolean>(false);

    const toggleIsEnabled = () => setIsEnabled(prev => !prev);

    const handleMouseMove = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        directChildren.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (hasAnyIntersection(event.clientY, visibilityRadiusPx, rect)) {
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

    return (
        <StyledBox
            className={clsx({ [`${CLASS_NAME_ROOT}`]: isEnabled })}
            onMouseMove={handleMouseMove}
        >
            {children}
        </StyledBox>
    );
};
