import type { TabConfig } from '@docupotamus/theme-common';
import { useLocation } from '@docusaurus/router';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useToolbar } from '../../contexts/toolbar';
import useCommonThemeConfig from '../../hooks/useCommonThemeConfig';
import Loading from './Loading';
import Tab from './Tab';

interface StyledBoxProps {
    readonly workbenchIsOpen: boolean;
};

const StyledBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'workbenchIsOpen',
})<StyledBoxProps>(({ workbenchIsOpen }) => ({
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
        '--box-shadow-width': 'var(--doc8-space-xs)',

        width: 'var(--box-shadow-width)',
        height: '100vh',

        position: 'absolute',
        top: 0,
        left: 'calc(-1 * var(--box-shadow-width))',

        content: '""',
        background: `linear-gradient(
            to right,
            transparent,
            rgba(60, 64, 67, 0.04) 70%,
            rgba(60, 64, 67, 0.07) 100%)`,
    },
}));

interface Props {
    readonly isLoading: boolean;
    readonly setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    readonly tabConfig: TabConfig;
};

const LoadableTab = (
    {
        isLoading,
        setIsLoading,
        tabConfig,
    }: Props,
): JSX.Element => {
    // TODO(dnguyen0304): Fix loading not triggering on open.
    if (isLoading) {
        return <Loading setIsLoading={setIsLoading} />;
    }
    return (
        <Tab displayName={tabConfig.displayName}>
            {tabConfig.Component}
        </Tab>
    );
};

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

    const tabConfig = tabIdToConfig.get(activeTabId);

    React.useEffect(() => {
        if (!loadingIsEnabled) {
            return;
        }
        setIsLoading(true);
    }, [location]);

    return (
        <StyledBox workbenchIsOpen={!!tabConfig}>
            {tabConfig &&
                // TODO(dnguyen0304): Replace temporary placeholder stub.
                <React.Suspense fallback={<p>Loading...</p>}>
                    <Tab displayName={tabConfig.displayName}>
                        <tabConfig.Component />
                    </Tab>
                </React.Suspense>
            }
        </StyledBox >
    );
};
