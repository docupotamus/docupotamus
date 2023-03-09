declare module '@docupotamus/docusaurus-theme-environment-variables' {
    interface PluginOptions { }
    interface EnvironmentVariablesThemeConfig { }
}

declare module '@docusaurus/theme-environment-variables' {
    export * from '@docupotamus/docusaurus-theme-environment-variables';
}
