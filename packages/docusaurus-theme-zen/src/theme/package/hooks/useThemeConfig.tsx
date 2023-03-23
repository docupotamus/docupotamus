import type { ThemeConfig } from '@doc8/theme-zen';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function useThemeConfig(): ThemeConfig {
    return (
        useDocusaurusContext()
            .siteConfig
            .themeConfig
            .docupotamusZen
    ) as ThemeConfig;
};
