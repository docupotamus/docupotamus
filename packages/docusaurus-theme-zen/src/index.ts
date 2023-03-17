import type { PluginOptions } from '@doc8/theme-zen';
import type { LoadContext, Plugin } from '@docusaurus/types';

export default function themeZen(
    _context: LoadContext,
    options: PluginOptions,
): Plugin<undefined> {
    const { swizzleIsEnabled = true } = options;

    return {
        name: 'docupotamus-theme-zen',

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
