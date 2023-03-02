import type { CommonThemeConfig } from '@docupotamus/theme-common';
import type {
    ThemeConfig,
    ThemeConfigValidationContext
} from '@docusaurus/types';
import { Joi } from '@docusaurus/utils-validation';

declare module '@docusaurus/types' {
    interface ThemeConfig {
        docupotamusCommon: CommonThemeConfig;
    }
};

const DEFAULT_THEME_CONFIG: CommonThemeConfig = {
    tabs: [],
};

const TabSchema = Joi.object({
    tabId: Joi
        .string()
        .required(),
    modulePath: Joi
        .string()
        .required(),
    iconModulePath: Joi
        .string()
        .required(),
});

// TODO(dnguyen0304): Investigate missing labels.
export const ThemeConfigSchema = Joi.object<ThemeConfig>({
    docupotamusCommon: Joi.object({
        tabs: Joi
            .array()
            .items(TabSchema)
            .default(DEFAULT_THEME_CONFIG.tabs),
    })
        .label('themeConfig.docupotamusCommon')
        .default(DEFAULT_THEME_CONFIG),
});

export const validateThemeConfig = ({
    validate,
    themeConfig,
}: ThemeConfigValidationContext<ThemeConfig>): ThemeConfig => {
    return validate(ThemeConfigSchema, themeConfig);
};
