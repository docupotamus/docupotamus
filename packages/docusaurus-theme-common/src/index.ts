import type { PluginOptions } from '@docupotamus/theme-common';
import type { LoadContext, Plugin } from '@docusaurus/types';

export default function themeCommon(
    _context: LoadContext,
    options: PluginOptions,
): Plugin<undefined> {
    const { swizzleIsEnabled = true } = options;

    return {
        name: 'docupotamus-theme-common',

        getThemePath() {
            if (swizzleIsEnabled) {
                return '../lib/theme/swizzle';
            }
            return '../lib/theme/public';
        },

        getTypeScriptThemePath() {
            if (swizzleIsEnabled) {
                return '../src/theme/swizzle';
            }
            return '../src/theme/public';
        },
    };
};

export { validateThemeConfig } from './validateThemeConfig';

export const getSwizzleComponentList = (): string[] => [];
