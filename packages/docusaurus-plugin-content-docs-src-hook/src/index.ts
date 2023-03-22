import type {
    LoadedContent,
    PluginOptions
} from '@docusaurus/plugin-content-docs';
import pluginContentDocs from '@docusaurus/plugin-content-docs';
import type { LoadContext, Plugin, RouteConfig } from '@docusaurus/types';
import { docuHash } from '@docusaurus/utils';
import fs from 'fs/promises';

// See: https://github.com/facebook/docusaurus/blob/01ac2e0fcaccaf469992f93a0e8bf04e61cf850e/packages/docusaurus-utils/src/pathUtils.ts#L93
const ALIASED_SITE_PATH_PREFIX: string = '@site';

export default async function pluginContentDocsSrcHook(
    context: LoadContext,
    options: PluginOptions,
): Promise<Plugin<LoadedContent>> {
    const wrappedPlugin = await pluginContentDocs(context, options);

    return {
        async contentLoaded({ content, allContent, actions }) {
            if (content.loadedVersions.length > 1) {
                throw new Error(
                    'Loading multiple versions is not yet implemented.'
                );
            }

            const newestVersion = content.loadedVersions[0];
            if (newestVersion === undefined) {
                throw new Error('No versions found.');
            }
            const { siteDir } = context;
            const { docLayoutComponent } = options;

            const pathToContent: { [path: string]: string } = {};

            for (let i = 0; i < newestVersion.docs.length; ++i) {
                const doc = newestVersion.docs[i];
                // This should never happen.
                if (doc === undefined) {
                    throw new Error('Unexpected bad state.');
                }
                const resolvedPath = doc.source.replace(
                    ALIASED_SITE_PATH_PREFIX,
                    siteDir,
                );
                const fileContents = await fs.readFile(
                    resolvedPath,
                    {
                        encoding: 'utf8',
                    },
                );
                // Remove the prefix and extension.
                const processedPath =
                    doc.source
                        .slice(ALIASED_SITE_PATH_PREFIX.length)
                        .replace(/\.[^/.]+$/, "");
                pathToContent[processedPath] = fileContents;
            }

            const pathToContentPath = await actions.createData(
                `raw-${docuHash('path-to-content')}.json`,
                JSON.stringify(pathToContent),
            );

            const addRouteWithModule = (config: RouteConfig) => {
                if (config.component === docLayoutComponent) {
                    actions.addRoute({
                        ...config,
                        modules: {
                            ...config.modules,
                            rawContent: pathToContentPath,
                        },
                    });
                } else {
                    actions.addRoute(config);
                }
            };

            await wrappedPlugin.contentLoaded!({
                content,
                allContent,
                actions: {
                    ...actions,
                    addRoute: addRouteWithModule,
                },
            });
        },

        // Everything below is delegated unchanged to the wrapped component.

        // TODO(dnguyen0304): Investigate how to specify a different plugin name
        // There are hard-coded references to specific plugin names.
        // See: https://github.com/facebook/docusaurus/blob/7ab2bd32342496f3f7373bc67d03a0da0eeffa40/packages/docusaurus-plugin-content-docs/src/client/index.ts#L89
        name: wrappedPlugin.name,

        extendCli(cli) {
            wrappedPlugin.extendCli!(cli);
        },

        getPathsToWatch() {
            return wrappedPlugin.getPathsToWatch!();
        },

        async loadContent() {
            return wrappedPlugin.loadContent!();
        },

        // This is intentionally left not async to remain consistent with the
        // wrapped component.
        getTranslationFiles({ content }) {
            return wrappedPlugin.getTranslationFiles!({ content });
        },

        translateContent({ content, translationFiles }) {
            return wrappedPlugin.translateContent!({
                content,
                translationFiles,
            });
        },

        configureWebpack(_config, isServer, utils, content) {
            return wrappedPlugin.configureWebpack!(
                _config,
                isServer,
                utils,
                content,
            );
        },
    };
};

export { validateOptions } from '@docusaurus/plugin-content-docs';

export const getSwizzleComponentList = (): string[] => [];
