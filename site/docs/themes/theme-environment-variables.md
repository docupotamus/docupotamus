---
sidebar_position: 15
---

# 📦 theme-environment-variables

<!-- import ApiTable from '@site/src/components/ApiTable'; -->

import { TaskList } from '@theme/docupotamus-task-list';

A Docusaurus theme that parameterizes code blocks.

## Try It Out

:::tip
In the right-docked Toolbar, open the "Environment Variables" tab and try it
out!
:::

```shell
echo "Hi, {{ NAME=friend }}, from your {{ KIND_ADJECTIVE }} doc8 team!"
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
In the right-docked Toolbar, open the "Environment Variables" tab and try it
out!
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

## What's Next? {#future}

The roadmap includes some important feature requests such as integrating with
the code block copy button and page-scoped (as opposed to block-scoped)
environment variables.

If you have comments, questions, or are looking to contribute, please start a
conversation over a [GitHub issue](https://github.com/docupotamus/docupotamus/issues?q=is%3Aopen+is%3Aissue+label%3A%22Environment+Variables%22)!
