import Box from '@mui/material/Box';
import * as React from 'react';
import useCommonThemeConfig from '../../../hooks/useCommonThemeConfig';
import Logo from './Logo';
import styles from './styles.module.css';

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
        <Box className={styles.Loading_container}>
            <Box className={styles.Loading_layout}>
                <Logo
                    className={styles.Loading_logo}
                    viewBox='100 700 1600 600'
                />
                <Box className={styles.Loading_barContainer}>
                    <Box className={styles.Loading_bar} />
                </Box>
            </Box>
        </Box>
    );
};
