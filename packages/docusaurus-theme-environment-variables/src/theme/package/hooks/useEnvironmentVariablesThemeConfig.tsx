import type { EnvironmentVariablesThemeConfig } from '@docupotamus/theme-environment-variables';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function useEnvironmentVariablesThemeConfig(): EnvironmentVariablesThemeConfig {
    return (
        useDocusaurusContext()
            .siteConfig
            .themeConfig
            .docupotamusEnvironmentVariables
    ) as EnvironmentVariablesThemeConfig;
};
