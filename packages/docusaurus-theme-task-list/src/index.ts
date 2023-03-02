import type { Plugin } from '@docusaurus/types';

export default function themeTaskList(): Plugin<undefined> {
    return {
        name: 'docupotamus-theme-task-list',

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
