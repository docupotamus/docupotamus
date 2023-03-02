import { useLocation } from '@docusaurus/router';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useToolbar } from '../../contexts/toolbar';
import useCommonThemeConfig from '../../hooks/useCommonThemeConfig';
import Loading from './Loading';
// import styles from './styles.module.css';

interface StyledBoxProps {
    readonly workbenchIsOpen: boolean;
    readonly boxShadowWidth: React.CSSProperties['width'];
};

const StyledBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'workbenchIsOpen' && prop !== 'boxShadowWidth',
})<StyledBoxProps>(({ workbenchIsOpen, boxShadowWidth }) => ({
    height: '100vh',

    position: 'sticky',
    top: 0,

    display: workbenchIsOpen ? 'flex' : 'none',
    flexDirection: 'column',
    justifyContent: 'flex-start',

    backgroundColor: 'var(--ifm-background-color)',
    borderTopLeftRadius: 'var(--doc8-space-l-xl)',
    // TODO(dnguyen0304): Investigate refactoring to box-shadow style to reduce
    // complexity.
    '&::before': {
        width: boxShadowWidth,
        height: '100vh',

        position: 'absolute',
        top: 0,
        left: `calc(-1 * ${boxShadowWidth})`,

        content: '""',
        background: `linear-gradient(
            to right,
            transparent,
            rgba(60, 64, 67, 0.15) 70%,
            rgba(60, 64, 67, 0.4) 100%)`,
    },
    '& > *': {
        borderTopLeftRadius: 'inherit',
    },
}));

export default function Workbench(): JSX.Element {
    const {
        debug: {
            loading: {
                isEnabled: loadingIsEnabled,
            },
        },
    } = useCommonThemeConfig();

    const location = useLocation();
    const { tabIdToConfig, activeTabId } = useToolbar();

    const [isLoading, setIsLoading] = React.useState<boolean>(loadingIsEnabled);

    // TODO(dnguyen0304): Add error handling.
    const Tab = activeTabId && tabIdToConfig.get(activeTabId)?.Component;

    React.useEffect(() => {
        if (!loadingIsEnabled) {
            return;
        }
        setIsLoading(true);
    }, [location]);

    return (
        // TODO(dnguyen0304): Change boxShadowWidth to custom property.
        <StyledBox
            workbenchIsOpen={!!activeTabId}
            boxShadowWidth='var(--doc8-space-xs)'
        >
            {/* TODO(dnguyen0304): Replace temporary placeholder stub. */}
            <React.Suspense fallback={<p>Loading...</p>}>
                {
                    // TODO(dnguyen0304): Fix loading not triggering on open.
                    isLoading
                        ? <Loading setIsLoading={setIsLoading} />
                        : Tab && <Tab />
                }
            </React.Suspense>
        </StyledBox >
    );
};
