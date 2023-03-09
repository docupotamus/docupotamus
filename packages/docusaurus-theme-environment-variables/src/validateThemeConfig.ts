import type { EnvironmentVariablesThemeConfig } from '@docusaurus/theme-environment-variables';
import type {
    ThemeConfig,
    ThemeConfigValidationContext
} from '@docusaurus/types';
import { Joi } from '@docusaurus/utils-validation';

declare module '@docusaurus/types' {
    interface ThemeConfig {
        docupotamusEnvironmentVariables: EnvironmentVariablesThemeConfig;
    }
};

const DEFAULT_THEME_CONFIG: EnvironmentVariablesThemeConfig = {};

// TODO(dnguyen0304): Investigate missing labels.
export const ThemeConfigSchema = Joi.object<ThemeConfig>({
    docupotamusEnvironmentVariables: Joi.object({
    })
        .label('themeConfig.docupotamusEnvironmentVariables')
        .default(DEFAULT_THEME_CONFIG),
});

export const validateThemeConfig = ({
    validate,
    themeConfig,
}: ThemeConfigValidationContext<ThemeConfig>): ThemeConfig => {
    return validate(ThemeConfigSchema, themeConfig);
};
