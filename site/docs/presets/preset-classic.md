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

### Preset and Standalone Differences

We recommended the preset because it is a drop-in replacement. On the other
hand, the standalone dependencies:

- are more low-level
- require more setup
- do not include Workbench integrations

<!-- - The preset wires together the theme such as that it never conflicts with other
  swizzled components.
- Just like with the `@docusaurus/docusaurus-preset-classic`, the preset
  provides a single interface for configuring plugins and themes.
- The preset provides a Workbench integration -->
