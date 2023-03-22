---
sidebar_position: 1
---

# 📦 styles-classic

import ApiTable from '@site/src/components/ApiTable';
import Demo from '@site/src/components/StylesClassicDemo';

<!-- If this changes, then change: README.md -->

A minimalist Docusaurus design that embraces soft, subtle details while
remaining superbly functional and readable.

## Try It Out

:::tip
You can also open the DevTools Console panel in
[device mode](https://developer.chrome.com/docs/devtools/device-mode/) to play
with these fluid custom properties.
:::

<Demo/>

### Common Use Cases

Use this when you want a neutral, minimalist stylesheet for your site.

### Infima Differences

:::info tl;dr
`styles-classic` extends from and is fully backward-compatible with Infima. It
also provides fluid typography and spacing.
:::

Docusaurus uses [Infima](https://docusaurus.io/docs/styling-layout#styling-your-site-with-infima)
as its styling framework. Most relevant to us are its CSS custom properties with
the `--ifm` prefix.

Docupotamus extends from and is fully backward-compatible with those CSS custom
properties. For a trivial example, we overwrite `--ifm-color-gray-0` and add
the new `--ifm-color-gray-0-hsl`.

Most importantly, we provide fluid typography and spacing with the `--doc8`
prefix. This modern design approach enables elements to scale proportionally
with screen size without having to rely on brittle breakpoints. See
[here](#popular-properties) for popular properties.

## Installation

:::tip
If you use the preset `@docupotamus/docusaurus-preset-classic`, you can skip
this step. You don't need to install as a standalone dependency because the
styles are already included in the preset.
:::

:::tip
The preset is recommended over installing the standalone dependency.
:::

```shell npm2yarn
$ npm install --save @docupotamus/docusaurus-styles-classic
```

Then register it in your site's `docusaurus.config.js`:

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

## Example Usage

:::note
Inline styles are used here only for demonstration purposes. For production
code, we recommended using a different approach that is more maintainable.
:::

```jsx title="MyHeading.jsx"
import * as React from 'react';

export default function MyHeading() {
  return (
    <h2
      style={{
        // highlight-next-line
        fontSize: 'var(--doc8-font-size-2)',
        // highlight-next-line
        padding: 'var(--doc8-space-xl) 0',
      }}
    >
      docupotamus
    </h2>
  );
}
```

## Customizing

### Popular Properties

```mdx-code-block
<ApiTable>
```

| Name                  | Example                      | Description               |
| --------------------- | ---------------------------- | ------------------------- |
| `--doc8-font-size-*`  | `--doc8-font-size-0`         | Steps of fluid font size. |
| `--doc8-space-*`      | `--doc8-space-xs`            | Steps of fluid spacing.   |
| `--ifm-color-primary` | `--ifm-color-primary-darker` | Primary color.            |
| `--ifm-color-white`   | `--ifm-color-white`          | White color.              |
| `--ifm-color-black`   | `--ifm-color-black`          | Black color.              |
| `--ifm-color-gray-*`  | `--ifm-color-gray-200`       | Tones of gray color.      |

```mdx-code-block
</ApiTable>
```

<details>
    <summary>See all properties</summary>

```mdx-code-block
import PropertiesSource from '!!raw-loader!@site/../packages/docusaurus-styles-classic/lib/properties.css';
import CodeBlock from '@theme/CodeBlock';

<CodeBlock className='language-css'>
    {PropertiesSource.trim()}
</CodeBlock>
```

</details>

### Example

```css title="new-primary-color.css"
/* Overwrite the custom property everywhere. */
:root {
  --ifm-color-primary: red;
}

/* Overwrite the custom property only in this scope. */
.theme-doc-markdown {
  --ifm-color-primary: blue;
}
```

## What's Next? {#future}

If you have comments, questions, or are looking to contribute, please start a
conversation over a
[GitHub issue](https://github.com/docupotamus/docupotamus/issues?q=is%3Aopen+is%3Aissue+label%3ACommon)!

Please remember to [⭐ give us a star on GitHub! ⭐](https://github.com/docupotamus/docupotamus)
