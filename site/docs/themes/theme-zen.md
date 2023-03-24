# 📦 theme-zen

import ApiTable from '@site/src/components/ApiTable';
import FlexImage from '@site/src/components/FlexImage';
import DemoGif from '@site/static/gifs/demo-zen.gif';

<!-- If this changes, then change: README.md -->

A Docusaurus theme to quiet the distractions and bring the zen.

Use this when you have particularly text-dense content, for example with
explanations of complex, technical concepts.

<FlexImage alt="Demo GIF" src={DemoGif} />

## Getting Started

### Try It Out

While holding down the <kbd>shift</kbd> key, slowly move your mouse around the
main content.

<!-- _keywords:_ demo -->

### Installation

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

Accepted theme config fields:

```mdx-code-block
<ApiTable>
```

| Name                 | Type     | Default | Description                              |
| -------------------- | -------- | ------- | ---------------------------------------- |
| `visibilityRadiusPx` | `number` | `100`   | Radius around the mouse that is visible. |

```mdx-code-block
</ApiTable>
```

:::note
No plugin option settings are yet supported.
:::

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

### Styling

:::note
Styling through theme class names is an **advanced** approach.

It's appropriate when you need complete control over fine-grained details such
as spacing. Otherwise, we recommended preferring to style through custom
properties and configuration.
:::

We provide some stable CSS class names for robust and maintainable global layout
styling. These names are theme-agnostic and meant to be targeted by custom CSS.

- `.DocupotamusZen_focus`

### Example Styling

Open your DevTools Console panel with <kbd>Command+Option+J</kbd> and try it
out!

```mdx-code-block
<Tabs>
<TabItem value="JavaScript">
```

```javascript title="JavaScript"
document.querySelector('.DocupotamusZen_focus');
```

```mdx-code-block
</TabItem>
<TabItem value="CSS">
```

```css title="CSS"
.DocupotamusZen_focus {
  /* The important flag is used here only for demonstration
     purposes. For production code, we recommended using a different
     approach to increase specificity. */
  background-color: red !important;
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Contributing

Use the git-commit-message convention for the scope.

```text
zen
```

## We're done here! {#future}

What's next? If you have comments, questions, or are looking to contribute,
please start a conversation over a [GitHub issue](https://github.com/docupotamus/docupotamus/issues?q=is%3Aopen+is%3Aissue+label%3A%22Zen%22)!

Please remember to [⭐ give us a star on GitHub! ⭐](https://github.com/docupotamus/docupotamus)
