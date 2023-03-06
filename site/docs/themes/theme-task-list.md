---
sidebar_position: 2
---

import ApiTable from '@site/src/components/ApiTable';
import { TaskList } from '@theme/docupotamus-task-list';

# 📦 theme-task-list

A Docusaurus theme that converts plain lists into beautiful, interactive task
lists.

## Try It Out

<TaskList>
- [ ] Drink a glass of water.
- [ ] Stretch your wrists for 30 seconds.
- [ ] Look out at nature.
</TaskList>

<details>
    <summary>See Plain List</summary>

- Drink a glass of water.
- Stretch your wrists for 30 seconds.
- Look out at nature.

</details>

### Common Use Cases

Use this when you need developers to follow a **series of steps**, such as how
to use your library or set up a development environment. Your developers can
keep track of their progress even while jumping around the page.

<!-- _keywords:_ demo -->

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
$ npm install --save @docupotamus/docusaurus-theme-task-list
```

```js title="docusaurus.config.js"
module.exports = {
  themes: ['@docupotamus/docusaurus-theme-task-list'],
};
```

### Preset and Standalone Differences

We recommended the preset because it is a drop-in replacement. On the other
hand, the standalone dependency:

- is more low-level
- involves more setup
- does not include the Workbench integration

## Example Usage

```md title="healthy-and-productive.md"
import { TaskList } from '@theme/docupotamus-task-list';

<TaskList>
- [ ] Drink 8 glasses of water.
- [ ] Stretch your wrists for 10 seconds.
- [ ] Look out at nature.
</TaskList>
```

## Customizing

### Configuration

Accepted fields:

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
as spacing. Otherwise, we recommended styling through configuration.
:::

We provide some stable CSS class names for robust and maintainable global layout
styling. These names are theme-agnostic and meant to be targeted by custom CSS.

- `.DocupotamusTaskList`
- `.DocupotamusTaskList_layout`

### Example Styling

Open your DevTools Console panel with <kbd>Command+Option+J</kbd> and try it
out!

```javascript title="JavaScript"
// Scroll up to the "Try It Out" section to see the targeted task
// list.
document.querySelector('.DocupotamusTaskList');
```

```css title="CSS"
.DocupotamusTaskList .MuiFormControlLabel-root .MuiTypography-root {
  /* The important flag is used here only for demonstration
     purposes. For production code, we recommended using a different
     approach to increase specificity. */
  color: red !important;
}
```

## Workbench Integration

<!-- TODO(dnguyen0304): Add gifs. -->

- **State Synchronization:** Task list state is synchronized between the page
  and the workbench. You can keep track of your progress even while jumping
  around the page.

- **Quick Navigation:** If a page contains multiple task lists, the buttons
  allow you to quickly navigate between the task lists.

## What's Next?

The roadmap includes some important feature requests such as fixing the
bothersome [`"rendering non-text nodes in a task list is not yet supported"` error](https://github.com/docupotamus/docupotamus/issues/9).

If you have comments, questions, or are looking to contribute, please start a
conversation over a [GitHub issue](https://github.com/docupotamus/docupotamus/issues?q=is%3Aopen+is%3Aissue+label%3A%22Task+List%22)!
