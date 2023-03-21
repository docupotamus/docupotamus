---
sidebar_position: 50
---

# 📦 theme-zen

import ApiTable from '@site/src/components/ApiTable';

A Docusaurus theme to quiet the distractions and bring the zen.

## Try It Out

While holding down the <kbd>shift</kbd> key, slowly move your mouse around the
main content.

<!-- _keywords:_ demo -->

### Common Use Cases

Use this when you have particularly text-dense content.

Common examples include explanations of complex, technical concepts. The focus
helps make content more approachable and easier to follow.

## Installation

:::tip
If you use the preset `@docupotamus/docusaurus-preset-classic`, you can skip
this step. You don't need to install as a standalone dependency because the
theme is already included in the preset.
:::

:::tip
The preset is recommended over installing the standalone dependency.
:::

```shell npm2yarn
$ npm install --save @docupotamus/docusaurus-theme-zen
```

Then register it in your site's `docusaurus.config.js`:

```js title="docusaurus.config.js"
module.exports = {
  themes: ['@docupotamus/docusaurus-theme-zen'],
};
```

## Customizing

### Configuration

Accepted fields:

```mdx-code-block
<ApiTable>
```

| Name                 | Type     | Default | Description                              |
| -------------------- | -------- | ------- | ---------------------------------------- |
| `visibilityRadiusPx` | `number` | `100`   | Radius around the mouse that is visible. |

```mdx-code-block
</ApiTable>
```

### Example Configuration

```js title="docusaurus.config.js"
module.exports = {
  themeConfig: {
    docupotamusZen: {
      visibilityRadiusPx: 200,
    },
  },
};
```

## What's Next? {#future}

If you have comments, questions, or are looking to contribute, please start a
conversation over a [GitHub issue](https://github.com/docupotamus/docupotamus/issues?q=is%3Aopen+is%3Aissue+label%3A%22Zen%22)!

Please remember to [⭐ give us a star on GitHub! ⭐](https://github.com/docupotamus/docupotamus)
