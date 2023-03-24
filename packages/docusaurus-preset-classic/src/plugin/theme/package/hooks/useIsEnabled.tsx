import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// TODO(dnguyen0304): Fix missing cohesion.
type PluginKey = 'param' | 'taskList' | 'zen';

export default function useIsEnabled(pluginKey: PluginKey): boolean {
    const { siteConfig } = useDocusaurusContext();

    const preset = siteConfig.presets[0];
    if (!preset || typeof preset === 'string') {
        return false;
    }
    const [, options] = preset;
    return !!(options[pluginKey] ?? true);
};
