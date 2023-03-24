---
sidebar_position: 20
---

# 📦 theme-task-list

import ApiTable from '@site/src/components/ApiTable';
import { TaskList } from '@theme/docupotamus-task-list';

<!-- If this changes, then change: README.md -->

A Docusaurus theme that converts plain lists into beautiful, interactive task
lists.

Use this when you need developers to follow a series of steps, for example with
how to use a library or set up a development environment.

## Getting Started

### Try It Out

:::tip
In the right-docked Toolbar, open the "Task List" tab to track your progress!
:::

<TaskList>
- Drink a glass of water.
- Stretch your wrists for 30 seconds.
- Look out at nature.
</TaskList>

<details>
    <summary>See plain list</summary>

- Drink a glass of water.
- Stretch your wrists for 30 seconds.
- Look out at nature.

</details>

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
$ npm install --save @docupotamus/docusaurus-theme-task-list
```

Then register it in your site's `docusaurus.config.js`:

```js title="docusaurus.config.js"
module.exports = {
  themes: ['@docupotamus/docusaurus-theme-task-list'],
};
```

### Example Usage

```md title="healthy-and-productive.md"
import { TaskList } from '@theme/docupotamus-task-list';

<TaskList>
- Drink 8 glasses of water.
- Stretch your wrists for 10 seconds.
- Look out at nature.
</TaskList>
```

:::caution
Task lists must be formatted without **empty newlines**. If you are using VS
Code, try using "File: Save without Formatting." This is a
[known limitation](#future).
:::

## Customizing

### Configuration

Accepted theme config fields:

```mdx-code-block
<ApiTable>
```

| Name                           | Type                           | Default                      | Description                                            |
| ------------------------------ | ------------------------------ | ---------------------------- | ------------------------------------------------------ |
| `checkbox.color`               | `React.CSSProperties['color']` | `'var(--ifm-color-primary)'` | Checkbox color.                                        |
| `checkbox.shape`               | `'circle'` &#124; `'square'`   | `'square'`                   | Checkbox shape.                                        |
| `checkbox.size`                | `'small'` &#124; `'medium'`    | `'medium'`                   | Checkbox size.                                         |
| `content.hoverColor`           | `React.CSSProperties['color']` | `'var(--ifm-color-primary)'` | Content color on hover.                                |
| `content.hoverColorBackground` | `React.CSSProperties['color']` | `'var(--ifm-hover-overlay)'` | Content background color on hover.                     |
| `progressBar.isEnabled`        | `boolean`                      | `true`                       | Whether to include a progress bar above the task list. |
| `progressBar.color`            | `React.CSSProperties['color']` | `'var(--ifm-color-primary)'` | Progress bar color.                                    |

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
    docupotamusTaskList: {
      checkbox: {
        color: 'red',
        shape: 'circle',
        size: 'small',
      },
      content: {
        hoverColorBackground: 'coral',
      },
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

- `.DocupotamusTaskList`
- `.DocupotamusTaskList_layout`

### Example Styling

Open your DevTools Console panel with <kbd>Command+Option+J</kbd> and try it
out!

```mdx-code-block
<Tabs>
<TabItem value="JavaScript">
```

```javascript title="JavaScript"
// Scroll up to the "Try It Out" section to see the targeted task
// list.
document.querySelector('.DocupotamusTaskList');
```

```mdx-code-block
</TabItem>
<TabItem value="CSS">
```

```css title="CSS"
.DocupotamusTaskList .MuiFormControlLabel-root .MuiTypography-root {
  /* The important flag is used here only for demonstration
     purposes. For production code, we recommended using a different
     approach to increase specificity. */
  color: red !important;
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Contributing

Use the git-commit-message convention for the scope.

```text
task-list
```

## We're done here! {#future}

The roadmap includes some important feature requests such as fixing the
bothersome [`"rendering non-text nodes in a task list is not yet supported"` error](https://github.com/docupotamus/docupotamus/issues/9).

What's next? If you have comments, questions, or are looking to contribute,
please start a conversation over a [GitHub issue](https://github.com/docupotamus/docupotamus/issues?q=is%3Aopen+is%3Aissue+label%3A%22Task+List%22)!

Please remember to [⭐ give us a star on GitHub! ⭐](https://github.com/docupotamus/docupotamus)
