import type { CommonThemeConfig } from '@doc8/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function useCommonThemeConfig(): CommonThemeConfig {
    return (
        useDocusaurusContext()
            .siteConfig
            .themeConfig
            .docupotamusCommon
    ) as CommonThemeConfig;
};
