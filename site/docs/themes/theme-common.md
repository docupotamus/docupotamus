---
sidebar_position: 10
---

# 📦 theme-common

import ApiTable from '@site/src/components/ApiTable';
import { TaskList } from '@theme/docupotamus-task-list';

A Docusaurus theme with a lightweight, unified interface for developing add-ons.

### Common Use Cases

Use this when you want to enhance your site with powerful add-ons.

You can integrate custom React components through a lightweight, unified
interface. They are then always readily accessible to developers through our
workbench.

For example, integrating with the workbench is how
[theme-task-list](./theme-task-list.md) works.

### Plugin and Add-On Differences

:::info tl;dr
Add-ons are at a conceptually smaller scope and can be more standalone.
:::

Docusaurus plugins and themes that provide UI components often
[swizzle](https://docusaurus.io/docs/swizzling) through ejecting or wrapping. On
the other hand, Docupotamus add-ons are at a conceptually smaller scope and can
be (but of course are not limited to being) more standalone.

For a trivial example, imagine integrating a glossary, `git blame` history, or
even calculator add-on.

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
$ npm install --save @docupotamus/docusaurus-theme-common
```

Then register it in your site's `docusaurus.config.js`:

```js title="docusaurus.config.js"
module.exports = {
  themes: ['@docupotamus/docusaurus-theme-common'],
};
```

## Customizing

### Configuration

Accepted fields:

```mdx-code-block
<ApiTable>
```

| Name               | Type      | Default | Description                                                                                                                                                                                                                                                      |
| ------------------ | --------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `swizzleIsEnabled` | `boolean` | `true`  | Whether to swizzle through overwriting. Otherwise, symbols are made public for importing. If you use the preset `@docupotamus/docusaurus-preset-classic`, this field is ignored. See also [Swizzle Clobbering](../presets/preset-classic.md#swizzle-clobbering). |

```mdx-code-block
</ApiTable>
```

### Example Configuration

```js title="docusaurus.config.js"
module.exports = {
  themes: [
    ['@docupotamus/docusaurus-theme-common', { swizzleIsEnabled: false }],
  ],
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

- `.DocupotamusCommon_toolbar`
- `.DocupotamusWorkbench`

### Example Styling

Open your DevTools Console panel with <kbd>Command+Option+J</kbd> and try it
out!

```mdx-code-block
<Tabs>
<TabItem value="JavaScript">
```

```javascript title="JavaScript"
document.querySelector('.DocupotamusCommon_toolbar');
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

### Integrate a new add-on

<details>
    <summary>See canonical reference</summary>

```mdx-code-block
import Source from '!!raw-loader!@site/../packages/docusaurus-preset-classic/src/plugin/theme/docupotamus-common/Toolbar/Entry/index.tsx';
import CodeBlock from '@theme/CodeBlock';

<CodeBlock
    className='language-tsx'
    title='@docupotamus/docusaurus-preset-classic/src/plugin/theme/docupotamus-common/Toolbar/Entry/index.tsx'
>
    {Source.trim()}
</CodeBlock>
```

</details>

<TaskList>
- [Prerequisite] Think about how you'll define your `TabConfig`.
- Create the folder structure for swizzling `Toolbar/Entry`.
- Add the boilerplate for swizzling `Toolbar/Entry`.
- Register your `TabConfig`.
</TaskList>

:::caution
Integrating a new add-on as a standalone dependency is supported but not yet
documented.
:::

#### Prepare a `TabConfig`

:::info Glossary
We refer to the controller as the _Toolbar_, the content for each integrated
add-on as a _Tab_, and the tabs container as the _Workbench_.
:::

Think about how you'll define your `TabConfig`. This is to prepare for the
following steps.

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

#### Create the folder structure

```shell
mkdir -p src/theme/docupotamus-common/Toolbar/Entry/ \
    && touch src/theme/docupotamus-common/Toolbar/Entry/index.tsx
```

This is for swizzling the `@theme/docupotamus-common/Toolbar/Entry/index.tsx`
component. Here is a common folder structure:

```text
@site/                     : root directory
  src/
    theme/                 : theme components
      docupotamus-common/
        Toolbar/
          Entry/
            index.tsx
```

#### Add the boilerplate

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

#### Register your `TabConfig`

```tsx title="index.tsx"
import type { WrapperProps } from '@docusaurus/types';
import ToolbarEntryInit from '@theme-init/docupotamus-common/Toolbar/Entry';
import { useToolbar } from '@theme/docupotamus-common';
import type ToolbarEntryType from '@theme/docupotamus-common/Toolbar/Entry';
// highlight-next-line
import { WorkbenchIcon } from '@theme/my-workbench-icon';
import * as React from 'react';

type Props = Readonly<WrapperProps<typeof ToolbarEntryType>>;

export default function ToolbarEntryWrapper(props: Props): JSX.Element {
  const { dispatchTabIdToConfig } = useToolbar();

  // highlight-start
  React.useEffect(() => {
    dispatchTabIdToConfig({
      type: 'setTab',
      tabId: 'my-first-add-on',
      newValue: {
        displayName: 'My First Add-On',
        Component: React.lazy(() =>
          import('@theme/my-workbench-tab').then((module) => ({
            default: module.WorkbenchTab,
          })),
        ),
        IconComponent: <WorkbenchIcon />,
      },
    });
  }, []);
  // highlight-end

  return <ToolbarEntryInit {...props} />;
}
```

## Contributing

- `git` Commit Message Scope:

```text
common
```

## What's Next? {#future}

If you have comments, questions, or are looking to contribute, please start a
conversation over a
[GitHub issue](https://github.com/docupotamus/docupotamus/issues?q=is%3Aopen+is%3Aissue+label%3ACommon)!

Please remember to [⭐ give us a star on GitHub! ⭐](https://github.com/docupotamus/docupotamus)
