import type { Plugin } from '@docusaurus/types';

// This theme should not be installed as a standalone dependency because it
// requires the Workbench integration. Therefore, swizzling through overwriting
// is not supported.
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

export const getSwizzleComponentList = (): string[] => [];
