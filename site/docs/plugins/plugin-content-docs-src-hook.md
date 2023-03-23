---
sidebar_position: 10
---

# 📦 plugin-content-docs-src-hook

<!-- If this changes, then change: README.md -->

A Docusaurus plugin that makes the raw Markdown content available through a
React hook.

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

## How-To's

<!-- _keywords:_ user guides -->

### Get raw Markdown content

#### Check your component hierarchy

:::tip
If you aren't sure, you are _probably_ okay, unless you are trying to get the
raw Markdown content from the `Root` theme component.
:::

The `RawContentProvider` is defined in the `DocPage` theme component. Make sure
your consumer component is a descendant.

#### Call the `useRawContent` hook

```jsx title="Example/DocItem/index.jsx"
import * as React from 'react';
import DocItem from '@theme-original/DocItem';
import { useRawContent } from '@theme/docupotamus-plugin-content-docs-src-hook';

export default function DocItemWrapper(props) {
  // highlight-next-line
  const { rawContent } = useRawContent();

  return <DocItem {...props} />;
}
```

#### Lookup the content by location

```jsx title="Example/DocItem/index.jsx"
import * as React from 'react';
import { useLocation } from '@docusaurus/router';
import DocItem from '@theme-original/DocItem';
import { useRawContent } from '@theme/docupotamus-plugin-content-docs-src-hook';

export default function DocItemWrapper(props) {
  // highlight-next-line
  const { pathname } = useLocation();
  const { rawContent } = useRawContent();

  React.useEffect(() => {
    // highlight-next-line
    const currentContent = rawContent[pathname];
    const message =
      currentContent !== undefined
        ? currentContent
        : `Content not found for path "${pathname}".`;
    console.log(message);
  }, [rawContent]);

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
