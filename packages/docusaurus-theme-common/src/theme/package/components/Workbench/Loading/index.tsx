import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import useCommonThemeConfig from '../../../hooks/useCommonThemeConfig';
import Logo from './Logo';
import styles from './styles.module.css';

const Layout = styled(Box)({
    height: '55%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    rowGap: 'var(--doc8-space-xl)',
});

interface Props {
    readonly setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Loading(
    {
        setIsLoading,
    }: Props
): JSX.Element {
    const {
        debug: {
            loading: {
                durationMilli,
            },
        },
    } = useCommonThemeConfig();

    const timerId = React.useRef<number>();

    React.useEffect(() => {
        timerId.current = window.setTimeout(() => {
            setIsLoading(false);
        }, durationMilli);
        return () => window.clearTimeout(timerId.current);
    }, []);

    return (
        <Box className={styles.Loading_container__pulse}>
            <Layout>
                {/* TODO(dnguyen0304): Move styles to class or styled component. */}
                <Logo
                    fill='#fff'
                    viewBox='100 700 1600 600'
                    width='80%'
                />
                <Box className={styles.Loading_container}>
                    <Box className={styles.Loading_bar} />
                </Box>
            </Layout>
        </Box>
    );
};
