import type { TaskListThemeConfig } from '@doc8/theme-task-list';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function useThemeConfig(): TaskListThemeConfig {
    return (
        useDocusaurusContext()
            .siteConfig
            .themeConfig
            .docupotamusTaskList
    ) as TaskListThemeConfig;
};
