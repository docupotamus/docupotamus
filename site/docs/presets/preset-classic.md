---
sidebar_position: 1
---

# 📦 preset-classic

<!-- import ApiTable from '@site/src/components/ApiTable'; -->
<!-- import { TaskList } from '@theme/docupotamus-task-list'; -->

<!-- A Docusaurus theme that converts plain lists into beautiful, interactive task
lists. -->

## Installation

:::tip
The preset is recommended over installing standalone dependencies.
:::

```bash npm2yarn
$ npm install --save @docupotamus/docusaurus-preset-classic
```

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

## Preset and Standalone Differences

We recommended the preset because it is a drop-in replacement. On the other
hand, the standalone dependencies:

- are more low-level
- require more setup
- do not include Workbench integrations
