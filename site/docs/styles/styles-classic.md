---
sidebar_position: 1
---

# 📦 styles-classic

## Installation

:::tip
If you use the preset `@docupotamus/docusaurus-preset-classic`, you can skip
this step. You don't need to install as a standalone dependency because the
styles are already included in the preset.
:::

:::tip
The preset is recommended over installing the standalone dependency.
:::

```bash npm2yarn
$ npm install --save @docupotamus/docusaurus-styles-classic
```

```js title="docusaurus.config.js"
module.exports = {
  presets: [
    [
      '@docupotamus/docusaurus-preset-classic',
      {
        theme: {
          // highlight-next-line
          customCss: require.resolve('@docupotamus/docusaurus-styles-classic'),
        },
      },
    ],
  ],
};
```

## What's Next? {#future}

If you have comments, questions, or are looking to contribute, please start a
conversation over a [GitHub issue](https://github.com/docupotamus/docupotamus/issues?q=is%3Aopen+is%3Aissue+label%3A%22Task+List%22)!