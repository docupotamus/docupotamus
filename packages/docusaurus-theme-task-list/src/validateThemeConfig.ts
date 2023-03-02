import type { TaskListThemeConfig } from '@docusaurus/theme-task-list';
import type {
    ThemeConfig,
    ThemeConfigValidationContext
} from '@docusaurus/types';
import { Joi } from '@docusaurus/utils-validation';

declare module '@docusaurus/types' {
    interface ThemeConfig {
        docupotamusTaskList: TaskListThemeConfig;
    }
};

const COLOR_PRIMARY: React.CSSProperties['color'] = 'var(--ifm-color-primary)';

const DEFAULT_THEME_CONFIG: TaskListThemeConfig = {
    checkbox: {
        color: COLOR_PRIMARY,
        shape: 'square',
        size: 'medium',
    },
    progressBar: {
        isEnabled: true,
        color: COLOR_PRIMARY,
    },
};

// TODO(dnguyen0304): Investigate missing labels.
export const ThemeConfigSchema = Joi.object<ThemeConfig>({
    docupotamusTaskList: Joi.object({
        checkbox: Joi.object({
            color: Joi
                .string()
                .default(DEFAULT_THEME_CONFIG.checkbox.color),
            shape: Joi
                .string()
                .valid('square', 'circle')
                .default(DEFAULT_THEME_CONFIG.checkbox.shape),
            size: Joi
                .string()
                .valid('small', 'medium')
                .default(DEFAULT_THEME_CONFIG.checkbox.size),
        })
            .default(DEFAULT_THEME_CONFIG.checkbox),
        progressBar: Joi.object({
            isEnabled: Joi
                .boolean()
                .default(DEFAULT_THEME_CONFIG.progressBar.isEnabled),
            color: Joi
                .string()
                .default(DEFAULT_THEME_CONFIG.progressBar.color),
        })
            .default(DEFAULT_THEME_CONFIG.progressBar),
    })
        .label('themeConfig.docupotamusTaskList')
        .default(DEFAULT_THEME_CONFIG),
});

export const validateThemeConfig = ({
    validate,
    themeConfig,
}: ThemeConfigValidationContext<ThemeConfig>): ThemeConfig => {
    return validate(ThemeConfigSchema, themeConfig);
};
