import type { Plugin } from '@docusaurus/types';

export default function themeEnvironmentVariables(): Plugin<undefined> {
    return {
        name: 'docupotamus-theme-environment-variables',

        getThemePath() {
            return '../lib/theme/public';
        },

        getTypeScriptThemePath() {
            return '../src/theme/public';
        },
    };
};

export { validateThemeConfig } from './validateThemeConfig';

export const getSwizzleComponentList = (): string[] => [];
