import type { ZenThemeConfig } from '@doc8/theme-zen';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function useThemeConfig(): ZenThemeConfig {
    return (
        useDocusaurusContext()
            .siteConfig
            .themeConfig
            .docupotamusZen
    ) as ZenThemeConfig;
};
