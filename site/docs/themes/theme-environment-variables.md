---
sidebar_position: 15
---

# 📦 theme-environment-variables

import { TaskList } from '@theme/docupotamus-task-list';

A Docusaurus theme that parameterizes code blocks.

## Try It Out

:::tip
In the right-docked Toolbar, open the "Environment Variables" tab to personalize
these snippets!
:::

```shell
echo "Hi, {{ NAME=friend }}, from your {{ KIND_ADJECTIVE }} doc8 team!"
```

```js
const whoEvenKnows = {{ LEFT }} + {{ RIGHT }};
```

<!-- _keywords:_ demo -->

### Common Use Cases

Use this when you have helpful code block but want to allow developers to
personalize those snippets. Common examples include domain-specific tasks such
as restoring a database backup and repetitive tasks such as installing a
package.

## Installation

:::info
This theme is only available through the preset
`@docupotamus/docusaurus-preset-classic` because it requires a Workbench
integration. Installing as a standalone dependency is not supported.
:::

See [here](../presets/preset-classic.md#installation) for instructions on
installing the `preset-classic`.

## Example Usage

:::tip
In the right-docked Toolbar, open the "Environment Variables" tab to personalize
these snippets!
:::

```text title="Syntax"
ENVIRONMENT_VARIABLE_NAME[=optional_default]

{{ FOO_bar_123 }}
```

<TaskList>
- Create a code block (```).
- Add an environment variable name without whitespaces "FOO_bar_123".
- [Optional] Add a default value "FOO_bar_123=456".
- Surround with 1 whitespace " FOO_bar_123 ".
- Surround with 2 curly braces "&#123;&#123; FOO_bar_123 &#125;&#125;".
</TaskList>

:::caution
Copying through the code block copy button is not yet supported. Please use the
Workbench integration copy button. This is a [known limitation](#future).
:::

## Customizing

### Styling

:::note
Styling through theme class names is an **advanced** approach.

It's appropriate when you need complete control over fine-grained details such
as spacing.
:::

We provide some stable CSS class names for robust and maintainable global layout
styling. These names are theme-agnostic and meant to be targeted by custom CSS.

- `.DocupotamusEnvironmentVariable`

Use the css-namespace-project convention for custom properties.

```text
ev
```

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
document.querySelector('.DocupotamusEnvironmentVariable');
```

```mdx-code-block
</TabItem>
<TabItem value="CSS">
```

```css title="CSS"
.DocupotamusEnvironmentVariable {
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

- `git` Commit Message Scope:

```text
env-var
```

## What's Next? {#future}

The roadmap includes some important feature requests such as integrating with
the code block copy button and page-scoped (as opposed to block-scoped)
environment variables.

If you have comments, questions, or are looking to contribute, please start a
conversation over a [GitHub issue](https://github.com/docupotamus/docupotamus/issues?q=is%3Aopen+is%3Aissue+label%3A%22Environment+Variables%22)!

Please remember to [⭐ give us a star on GitHub! ⭐](https://github.com/docupotamus/docupotamus)
