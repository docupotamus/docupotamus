import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type PluginKey = 'zen';

export default function useIsEnabled(pluginKey: PluginKey): boolean {
    const { siteConfig } = useDocusaurusContext();

    const preset = siteConfig.presets[0];
    if (!preset || typeof preset === 'string') {
        return false;
    }
    const [, options] = preset;
    return !!options[pluginKey];
};
