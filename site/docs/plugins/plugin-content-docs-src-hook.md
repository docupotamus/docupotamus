---
sidebar_position: 10
---

# 📦 plugin-content-docs-src-hook

import ApiTable from '@site/src/components/ApiTable';
import Demo from '@site/src/components/SrcHookDemo';

<!-- If this changes, then change: README.md -->

A Docusaurus plugin that makes the raw Markdown content available through a
React hook.

## Try It Out

Here is an excerpt of this page's raw Markdown content. Note the file path is
also available.

<Demo/>

<!-- _keywords:_ demo -->

### Common Use Cases

Use this when you need dynamic access to the raw Markdown content.

:::info Glossary
We refer to the access as _dynamic_. This contrasts with simply statically
importing using the [`raw-loader`](https://docusaurus.io/docs/markdown-features/react#importing-code-snippets),
which is insufficient for some use cases.
:::

Common examples include rich interactions such as with an integrated editor.

## Installation

:::tip
If you use the preset `@docupotamus/docusaurus-preset-classic`, you can skip
this step. You don't need to install as a standalone dependency because the
plugin is already included in the preset.
:::

:::tip
The preset is recommended over installing the standalone dependency.
:::

```shell npm2yarn
$ npm install --save @docupotamus/docusaurus-plugin-content-docs-src-hook
```

Then register it in your site's `docusaurus.config.js`:

```js title="docusaurus.config.js"
module.exports = {
    plugins: [
        [
            // highlight-next-line
            '@docupotamus/docusaurus-plugin-content-docs-src-hook',
            {
                // Add your @docusaurus/plugin-content-docs settings
                // originally in the preset here.
                ...
            },
        ],
    ],
    presets: [
        [
            'classic',
            ({
                // See "Docusaurus Differences" for why this is disabled.
                // highlight-next-line
                docs: false,
                ...
            }),
        ],
    ],
};
```

:::caution
Depending on your deployment, you might need to configure the `trailingSlash`
setting. See ["Configuration"](#configuration) for more details.
:::

## Concepts

### Docusaurus Differences

:::info tl;dr
This plugin is a backward-compatible, drop-in replacement.
:::

The two plugins are fully backward-compatible because Docupotamus
`plugin-content-docs-src-hook` is implemented as just a thin wrapper. It
strictly only extends Docusaurus `plugin-content-docs`.

When installing as a standalone dependency (i.e. using Docusaurus
`preset-classic`), this is why we disable `plugin-content-docs` in the preset
options.

## Customizing

### Configuration

Accepted fields:

:::note
Different static website hosting providers have inconsistent and often
undocumented behaviors for how they handle trailing slashes. You might need to
configure the [`trailingSlash` setting](https://docusaurus.io/docs/api/docusaurus-config#trailingSlash).
:::

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
  trailingSlash: true,
  plugins: [
    [
      '@docupotamus/docusaurus-plugin-content-docs-src-hook',
      { swizzleIsEnabled: false },
    ],
  ],
};
```

## How-To's

<!-- _keywords:_ user guides -->

### Get raw Markdown content

#### Check your component hierarchy

:::tip
If you aren't sure, you are _probably_ okay, unless you are trying to get the
raw Markdown content from the `Root` theme component.
:::

The `PathToContentProvider` is defined in the `DocPage` theme component. Make
sure your consumer component is a descendant.

#### Call the `usePathToContent` hook

```jsx title="Example/DocItem/index.jsx"
import * as React from 'react';
import DocItem from '@theme-original/DocItem';
import { usePathToContent } from '@theme/docupotamus-plugin-content-docs-src-hook';

export default function DocItemWrapper(props) {
  // highlight-next-line
  const { pathToContent } = usePathToContent();

  return <DocItem {...props} />;
}
```

#### Lookup the content by location

:::tip
Always use the Docupotamus `useLocation` hook.

It is a backward-compatible, drop-in replacement for Docusaurus
`@docusaurus/router`. This hook is implemented as just a thin wrapper to handle
trailing slash logic.
:::

```jsx title="Example/DocItem/index.jsx"
import * as React from 'react';
import DocItem from '@theme-original/DocItem';
import {
  useLocation,
  usePathToContent,
} from '@theme/docupotamus-plugin-content-docs-src-hook';

export default function DocItemWrapper(props) {
  // highlight-next-line
  const { pathname } = useLocation();
  const { pathToContent } = usePathToContent();

  React.useEffect(() => {
    // highlight-next-line
    const rawContent = pathToContent[pathname];
    const message =
      rawContent !== undefined
        ? rawContent
        : `Raw content not found for path "${pathname}".`;
    console.log(message);
  }, [pathToContent]);

  return <DocItem {...props} />;
}
```

## Contributing

Use the git-commit-message convention for the scope.

```text
src-hook
```

## What's Next? {#future}

If you have comments, questions, or are looking to contribute, please start a
conversation over a [GitHub issue](https://github.com/docupotamus/docupotamus/issues?q=is%3Aopen+is%3Aissue+label%3A%22Src+Hook%22)!

Please remember to [⭐ give us a star on GitHub! ⭐](https://github.com/docupotamus/docupotamus)

<!-- ```bash
npm install --save \
    @docupotamus/docusaurus-plugin-editor \
    @docupotamus/docusaurus-theme-editor
```

### Quickstart

Get the editUrl. This /blob/main path is required? Not sure what this is for.

## Lambda

### `handleOAuthRedirect`

#### Environment Variables

TODO(dnguyen0304): Document how to find GitHub client ID and secret.

```bash title=".env"
export CLIENT_ID="{{ CLIENT_ID }}"
export CLIENT_SECRET="{{ CLIENT_SECRET }}"
export REFERER_ALLOWLIST="{{ REFERER_ALLOWLIST }}"
``` -->
