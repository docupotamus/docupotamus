import type { CommonThemeConfig } from '@doc8/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function useThemeConfig(): CommonThemeConfig {
    return (
        useDocusaurusContext()
            .siteConfig
            .themeConfig
            .docupotamusCommon
    ) as CommonThemeConfig;
};
