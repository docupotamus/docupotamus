---
sidebar_position: 1
---

# 📦 preset-classic

<!-- import ApiTable from '@site/src/components/ApiTable'; -->
<!-- import { TaskList } from '@theme/docupotamus-task-list'; -->

A Docusaurus preset that bundles a minimalist design, unified add-on interface,
and powerful built-ins.

It provides lightweight, centralized configuration for the following plugins and
themes:

- [`@docupotamus/docusaurus-styles-classic`](../styles/styles-classic.md)
- [`@docupotamus/docusaurus-theme-common`](../themes/theme-common.md)
- [`@docupotamus/docusaurus-theme-task-list`](../themes/theme-task-list.md)
- [`@docusaurus/preset-classic`](#docusaurus-differences)

## Installation

:::tip
The preset is recommended over installing standalone dependencies.
:::

```bash npm2yarn
$ npm install --save @docupotamus/docusaurus-preset-classic
```

Then register it in your site's `docusaurus.config.js`:

```js title="docusaurus.config.js"
module.exports = {
    presets: [
        [
            // highlight-next-line
            '@docupotamus/docusaurus-preset-classic',
            ({
                docs: ...
            }),
        ],
    ],
};
```

## Concepts

### Docusaurus Differences

:::tip tl;dr
This preset is a backward-compatible, drop-in replacement.
:::

The presets are fully backward-compatible because Docupotamus `preset-classic` is implemented as just a thin convenience wrapper. It strictly only extends Docusaurus `preset-classic`.

Therefore, the Docupotamus preset includes all bundled plugins and themes you're used to. See [here](https://docusaurus.io/docs/using-plugins#docusauruspreset-classic) for the full list.

### Preset and Standalone Differences

We recommended the preset because it is a backward-compatible, drop-in
replacement. On the other hand, the standalone dependencies:

- are more low-level
- require more setup
- do not include Workbench integrations

The preset registers plugins and themes such that they never conflict with one
another due to swizzle clobbering.
