import type { Plugin } from '@docusaurus/types';

export default function theme(): Plugin<undefined> {
    return {
        name: 'docupotamus-theme-preset-classic',

        getThemePath() {
            return '../../lib/plugin/theme/swizzle';
        },

        getTypeScriptThemePath() {
            return '../../src/plugin/theme/swizzle';
        },
    };
};

export const getSwizzleComponentList = (): string[] => [];
