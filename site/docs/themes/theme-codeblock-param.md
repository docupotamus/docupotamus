---
sidebar_position: 15
---

# 📦 theme-codeblock-param

import FlexImage from '@site/src/components/FlexImage';
import DemoGif from '@site/static/gifs/demo-code-param.gif';
import { TaskList } from '@theme/docupotamus-task-list';

<!-- If this changes, then change: README.md -->

A Docusaurus theme that parameterizes code blocks.

Use this when you have helpful code blocks but want to allow developers to
personalize those snippets, for example with repetitive tasks (e.g. installing a
package).

<FlexImage alt="Demo GIF" src={DemoGif} width="l" />

## Getting Started

### Try It Out

:::tip
In the right-docked Toolbar, open the "Parameters" tab to personalize
these snippets!
:::

```shell
echo "Hi, {{ NAME=friend }}, from your {{ KIND_ADJECTIVE }} doc8 team!"
```

```js
const whoEvenKnows = {{ LEFT }} + {{ RIGHT }};
```

<!-- _keywords:_ demo -->

### Installation

:::info
This theme is only available through the preset
`@docupotamus/docusaurus-preset-classic` because it requires a Workbench
integration. Installing as a standalone dependency is not yet supported.
:::

See [here](../presets/preset-classic.md#installation) for instructions on
installing the `preset-classic`.

### Example Usage

:::tip
In the right-docked Toolbar, open the "Parameters" tab to personalize
these snippets!
:::

```text title="Syntax"
PARAMETER_NAME[=optional_default]

{{ FOO_bar_123 }}
```

<TaskList>
- Create a code block (```).
- Add a parameter name without whitespaces "FOO_bar_123".
- [Optional] Add a default value "FOO_bar_123=456".
- Surround with 1 whitespace " FOO_bar_123 ".
- Surround with 2 curly braces "&#123;&#123; FOO_bar_123 &#125;&#125;".
</TaskList>

:::caution
Copying through the code block copy button is not yet supported. Please use the
Workbench integration copy button. This is a [known limitation](#future).
:::

## Customizing

### Configuration

:::note
No plugin option nor theme config settings are yet supported.
:::

### Styling

:::note
Styling through theme class names is an **advanced** approach.

It's appropriate when you need complete control over fine-grained details such
as spacing.
:::

We provide some stable CSS class names for robust and maintainable global layout
styling. These names are theme-agnostic and meant to be targeted by custom CSS.

- `.DocupotamusCodeblockParameter`

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
document.querySelector('.DocupotamusCodeblockParameter');
```

```mdx-code-block
</TabItem>
<TabItem value="CSS">
```

```css title="CSS"
.DocupotamusCodeblockParameter {
  /* The important flag is used here only for demonstration
     purposes. For production code, we recommended using a different
     approach to increase specificity. */
  font-size: 2rem !important;
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Contributing

Use the git-commit-message convention for the scope.

```text
param
```

Use the css-namespace-project convention for custom properties.

```text
cbp
```

## We're done here! {#future}

The roadmap includes some important feature requests such as integrating with
the code block copy button and page-scoped (as opposed to block-scoped)
parameters.

What's next? If you have comments, questions, or are looking to contribute,
please start a conversation over a [GitHub issue](https://github.com/docupotamus/docupotamus/issues?q=is%3Aopen+is%3Aissue+label%3A"Code+Block+Parameterization")!

Please remember to [⭐ give us a star on GitHub! ⭐](https://github.com/docupotamus/docupotamus)
