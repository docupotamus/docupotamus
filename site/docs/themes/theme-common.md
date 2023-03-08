---
sidebar_position: 1
---

# 📦 theme-common

import { TaskList } from '@theme/docupotamus-task-list';

A Docusaurus theme with a lightweight, unified interface for developing add-ons.

### Common Use Cases

Use this when you want to enhance your site with powerful **add-ons**.

You can integrate custom React components through a lightweight, unified interface. They are then always readily accessible to developers through the workbench.

For example, integrating with the workbench is how [theme-task-list](./theme-task-list.md) works.

### Plugin and Add-On Differences

:::tip tl;dr
Add-ons are at a conceptually smaller scope and can be more standalone.
:::

Plugins and themes that provide UI components often [swizzle](https://docusaurus.io/docs/swizzling) through ejecting or wrapping. On the other hand, add-ons are at a conceptually smaller scope and can be (but of course are not limited to being) more standalone. For a trivial example, imagine integrating a glossary, `git blame` history, or even calculator add-on.

## Installation

:::tip
If you use the preset `@docupotamus/docusaurus-preset-classic`, you can skip
this step. You don't need to install as a standalone dependency because the
theme is already included in the preset.
:::

:::tip
The preset is recommended over installing the standalone dependency.
:::

```bash npm2yarn
$ npm install --save @docupotamus/docusaurus-theme-common
```

```js title="docusaurus.config.js"
module.exports = {
  themes: ['@docupotamus/docusaurus-theme-common'],
};
```

## Customizing

### Styling

:::note
Styling through theme class names is an **advanced** approach.

It's appropriate when you need complete control over fine-grained details such
as spacing. Otherwise, we recommended preferring to style through custom properties and configuration.
:::

We provide some stable CSS class names for robust and maintainable global layout
styling. These names are theme-agnostic and meant to be targeted by custom CSS.

- `.DocupotamusToolbar`
- `.DocupotamusWorkbench`

### Example Styling

Open your DevTools Console panel with <kbd>Command+Option+J</kbd> and try it
out!

```mdx-code-block
<Tabs>
<TabItem value="JavaScript">
```

```javascript title="JavaScript"
document.querySelector('.DocupotamusToolbar');
```

```mdx-code-block
</TabItem>
<TabItem value="CSS">
```

```css title="CSS"
.DocupotamusWorkbench {
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

## How-To's

<!-- _keywords:_ user guides -->

### Integrate a New Add-On

<details>
    <summary>See Canonical Reference</summary>

```mdx-code-block
import Source from '!!raw-loader!@site/../packages/docusaurus-preset-classic/src/plugin/theme/docupotamus-common/Toolbar/Entry/index.tsx';
import CodeBlock from '@theme/CodeBlock';

<CodeBlock className='language-tsx'>
    {Source.trim()}
</CodeBlock>
```

</details>

<TaskList>
- [Prerequisite] Think about how you'll define your `TabConfig`.
- Create the folder structure for swizzling `Toolbar/Entry`.
- Add the boilerplate for swizzling `Toolbar/Entry`.
</TaskList>

#### Prepare a `TabConfig`

:::info Glossary
We refer to the controller as the _Toolbar_, the content for each integrated
add-on as a _Tab_, and the tabs container as the _Workbench_.
:::

Think about how you'll define your `TabConfig`. This makes sure all the required
pieces are available for the following steps.

```tsx
interface TabConfig {
  // Tab unique identifier.
  readonly tabId: string;

  // Display header text that is human-readable.
  readonly displayName: string;

  // Tab component.
  readonly Component: React.LazyExoticComponent<() => JSX.Element>;

  // Toolbar icon component.
  readonly IconComponent: JSX.Element;
}
```

#### Create the Folder Structure

This is for swizzling the `@theme/docupotamus-common/Toolbar/Entry` component.
Here is a common folder structure:

```text
@site/                     : root directory
  src/
    theme/                 : theme components
      docupotamus-common/
        Toolbar/
          Entry/
            index.tsx
```

#### Add the Boilerplate

```tsx title="index.tsx"
import type { WrapperProps } from '@docusaurus/types';
import ToolbarEntryInit from '@theme-init/docupotamus-common/Toolbar/Entry';
import type ToolbarEntryType from '@theme/docupotamus-common/Toolbar/Entry';
import * as React from 'react';

type Props = Readonly<WrapperProps<typeof ToolbarEntryType>>;

export default function ToolbarEntryWrapper(props: Props): JSX.Element {
  return <ToolbarEntryInit {...props} />;
}
```

## What's Next? {#future}

If you have comments, questions, or are looking to contribute, please start a
conversation over a [GitHub issue](https://github.com/docupotamus/docupotamus/issues?q=is%3Aopen+is%3Aissue+label%3ACommon)!
