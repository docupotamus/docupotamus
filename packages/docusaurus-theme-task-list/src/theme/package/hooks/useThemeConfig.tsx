import type { ThemeConfig } from '@doc8/theme-task-list';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function useThemeConfig(): ThemeConfig {
    return (
        useDocusaurusContext()
            .siteConfig
            .themeConfig
            .docupotamusTaskList
    ) as ThemeConfig;
};
