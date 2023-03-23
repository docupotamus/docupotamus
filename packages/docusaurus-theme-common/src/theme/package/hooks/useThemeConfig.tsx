import type { ThemeConfig } from '@doc8/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function useThemeConfig(): ThemeConfig {
    return (
        useDocusaurusContext()
            .siteConfig
            .themeConfig
            .docupotamusCommon
    ) as ThemeConfig;
};
