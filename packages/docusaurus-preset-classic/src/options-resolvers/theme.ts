import type { Options } from '@docusaurus/theme-classic';

export default function resolve(options?: Options): Options {
    const path = '@docupotamus/docusaurus-styles-classic';
    const classicStyles = require.resolve(path);
    const resolved = options || {};
    if (resolved.customCss === undefined) {
        resolved.customCss = classicStyles;
    } else if (typeof resolved.customCss === 'string') {
        resolved.customCss = [resolved.customCss, classicStyles];
    } else {
        resolved.customCss.push(classicStyles);
    }
    return resolved;
};
