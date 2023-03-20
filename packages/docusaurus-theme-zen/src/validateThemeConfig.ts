import type { ZenThemeConfig } from '@doc8/theme-zen';
import type {
    ThemeConfig,
    ThemeConfigValidationContext
} from '@docusaurus/types';
import { Joi } from '@docusaurus/utils-validation';

declare module '@docusaurus/types' {
    interface ThemeConfig {
        docupotamusZen: ZenThemeConfig;
    }
};

const DEFAULT_THEME_CONFIG: ZenThemeConfig = {
    mouseRadiusPx: 100,
};

// TODO(dnguyen0304): Investigate missing labels.
export const ThemeConfigSchema = Joi.object<ThemeConfig>({
    docupotamusZen: Joi.object({
        mouseRadiusPx: Joi
            .number()
            .default(DEFAULT_THEME_CONFIG.mouseRadiusPx),
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
