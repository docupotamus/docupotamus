import type { EnvironmentVariablesThemeConfig } from '@docusaurus/theme-environment-variables';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function useEnvironmentVariablesThemeConfig(): EnvironmentVariablesThemeConfig {
    return (
        useDocusaurusContext()
            .siteConfig
            .themeConfig
            .docupotamusEnvironmentVariables
    ) as EnvironmentVariablesThemeConfig;
};
