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
    debug: {
        loading: {
            isEnabled: true,
            // TODO(dnguyen0304): Fix missing cohesion with animation-duration.
            durationMilli: 5 * 1000,
        },
    },
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
        debug: Joi.object({
            loading: Joi.object({
                isEnabled: Joi
                    .boolean()
                    .default(DEFAULT_THEME_CONFIG.debug.loading.isEnabled),
                durationMilli: Joi
                    .number()
                    .default(DEFAULT_THEME_CONFIG.debug.loading.durationMilli)
                    .when(
                        'isEnabled',
                        {
                            is: Joi.boolean().valid(false),
                            // TODO(dnguyen0304): Improve error messaging.
                            then: Joi.forbidden(),
                        },
                    ),
            })
                .default(DEFAULT_THEME_CONFIG.debug.loading),
        })
            .default(DEFAULT_THEME_CONFIG.debug),
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
