import type { Plugin } from '@docusaurus/types';

export default function theme(): Plugin<undefined> {
    return {
        name: 'docupotamus-theme-preset-classic',

        getThemePath() {
            return '../../lib/plugin/theme';
        },

        getTypeScriptThemePath() {
            return '../../src/plugin/theme';
        },
    };
};

export const getSwizzleComponentList = (): string[] => [];
