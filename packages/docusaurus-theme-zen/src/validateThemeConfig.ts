import type { ThemeConfig as ThemeConfigExtension } from '@doc8/theme-zen';
import type {
    ThemeConfig,
    ThemeConfigValidationContext
} from '@docusaurus/types';
import { Joi } from '@docusaurus/utils-validation';

declare module '@docusaurus/types' {
    interface ThemeConfig {
        docupotamusZen: ThemeConfigExtension;
    }
};

const DEFAULT_THEME_CONFIG: ThemeConfigExtension = {
    visibilityRadiusPx: 100,
};

// TODO(dnguyen0304): Investigate missing labels.
export const ThemeConfigSchema = Joi.object<ThemeConfig>({
    docupotamusZen: Joi.object({
        visibilityRadiusPx: Joi
            .number()
            .default(DEFAULT_THEME_CONFIG.visibilityRadiusPx),
    })
        .label('themeConfig.docupotamusZen')
        .default(DEFAULT_THEME_CONFIG),
});

export const validateThemeConfig = ({
    validate,
    themeConfig,
}: ThemeConfigValidationContext<ThemeConfig>): ThemeConfig => {
    return validate(ThemeConfigSchema, themeConfig);
};
