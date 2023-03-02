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
        <Box className={styles.Loading_container__pulse}>
            <Box className={styles.Loading_layout}>
                {/* TODO(dnguyen0304): Move styles to class or styled component. */}
                <Logo
                    fill='#fff'
                    viewBox='100 700 1600 600'
                    width='80%'
                />
                <Box className={styles.Loading_barContainer}>
                    <Box className={styles.Loading_bar} />
                </Box>
            </Box>
        </Box>
    );
};
