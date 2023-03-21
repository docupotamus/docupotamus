---
sidebar_position: 50
---

# 📦 theme-zen

import ApiTable from '@site/src/components/ApiTable';

A Docusaurus theme to quiet the distractions and bring the zen.

## Try It Out

While holding down the <kbd>shift</kbd> key, slowly move your mouse around the
main content.

<!-- _keywords:_ demo -->

## Customizing

### Configuration

Accepted fields:

```mdx-code-block
<ApiTable>
```

| Name                 | Type     | Default | Description                              |
| -------------------- | -------- | ------- | ---------------------------------------- |
| `visibilityRadiusPx` | `number` | `100`   | Radius around the mouse that is visible. |

```mdx-code-block
</ApiTable>
```

### Example Configuration

```js title="docusaurus.config.js"
module.exports = {
  themeConfig: {
    docupotamusZen: {
      visibilityRadiusPx: 200,
    },
  },
};
```

## What's Next? {#future}

If you have comments, questions, or are looking to contribute, please start a
conversation over a [GitHub issue](https://github.com/docupotamus/docupotamus/issues?q=is%3Aopen+is%3Aissue+label%3A%22Zen%22)!

Please remember to [⭐ give us a star on GitHub! ⭐](https://github.com/docupotamus/docupotamus)
