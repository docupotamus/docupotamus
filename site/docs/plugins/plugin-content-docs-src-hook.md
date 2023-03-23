---
sidebar_position: 10
---

# 📦 plugin-content-docs-src-hook

<!-- If this changes, then change: README.md -->

A Docusaurus plugin that makes the raw Markdown content available through a
React hook.

## Installation

:::tip
If you use the preset `@docupotamus/docusaurus-preset-classic`, you can skip
this step. You don't need to install as a standalone dependency because the
plugin is already included in the preset.
:::

:::tip
The preset is recommended over installing the standalone dependency.
:::

```shell npm2yarn
$ npm install --save @docupotamus/docusaurus-plugin-content-docs-src-hook
```

Then register it in your site's `docusaurus.config.js`:

```js title="docusaurus.config.js"
module.exports = {
    plugins: [
        [
            // highlight-next-line
            '@docupotamus/docusaurus-plugin-content-docs-src-hook',
            {
                // Add your other @docusaurus/plugin-content-docs
                // settings here.
                ...
            },
        ],
    ],
    presets: [
        [
            'classic',
            ({
                // highlight-next-line
                docs: false,
                ...
            }),
        ],
    ],
};
```

## Contributing

Use the git-commit-message convention for the scope.

```text
src-hook
```

## What's Next? {#future}

If you have comments, questions, or are looking to contribute, please start a
conversation over a [GitHub issue](https://github.com/docupotamus/docupotamus/issues?q=is%3Aopen+is%3Aissue+label%3A%22Src+Hook%22)!

Please remember to [⭐ give us a star on GitHub! ⭐](https://github.com/docupotamus/docupotamus)

<!-- ```bash
npm install --save \
    @docupotamus/docusaurus-plugin-editor \
    @docupotamus/docusaurus-theme-editor
```

### Quickstart

`docusaurus-plugin-editor` extends `plugin-content-docs`. Therefore, to avoid a
collision from multiple instances, remove `plugin-content-docs` from the preset
and add `docusaurus-plugin-editor` as a plugin.

Get the editUrl. This /blob/main path is required? Not sure what this is for.

## Lambda

### `handleOAuthRedirect`

#### Environment Variables

TODO(dnguyen0304): Document how to find GitHub client ID and secret.

```bash title=".env"
export CLIENT_ID="{{ CLIENT_ID }}"
export CLIENT_SECRET="{{ CLIENT_SECRET }}"
export REFERER_ALLOWLIST="{{ REFERER_ALLOWLIST }}"
``` -->
