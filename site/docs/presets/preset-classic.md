---
sidebar_position: 1
---

# 📦 preset-classic

A Docusaurus preset that bundles a minimalist design, unified add-on interface,
and powerful built-ins.

It provides lightweight, centralized configuration for the following plugins and
themes:

- [`@docupotamus/docusaurus-styles-classic`](../styles/styles-classic.md)
- [`@docupotamus/docusaurus-theme-common`](../themes/theme-common.md)
- [`@docupotamus/docusaurus-theme-task-list`](../themes/theme-task-list.md)
- [`@docusaurus/preset-classic`](#docusaurus-differences)

### Common Use Cases

Use this when you want to use Docupotamus features, but don't want to maintain
the code for integrating them with your existing Docusaurus site. See
[here](#swizzle-clobbering) for more details on the challenges.

## Installation

<!-- If change, then change: ../quickstart.md -->

:::tip
The preset is recommended over installing standalone dependencies.
:::

```shell npm2yarn
$ npm install --save @docupotamus/docusaurus-preset-classic
```

Then register it in your site's `docusaurus.config.js`:

```js title="docusaurus.config.js"
module.exports = {
    presets: [
        [
            // highlight-next-line
            '@docupotamus/docusaurus-preset-classic',
            ({
                docs: ...
            }),
        ],
    ],
};
```

## Concepts

### Docusaurus Differences

:::info tl;dr
This preset is a backward-compatible, drop-in replacement.
:::

The presets are fully backward-compatible because Docupotamus `preset-classic`
is implemented as just a thin convenience wrapper. It strictly only extends
Docusaurus `preset-classic`.

Therefore, the Docupotamus preset includes all bundled plugins and themes you're
used to. See [here](https://docusaurus.io/docs/using-plugins#docusauruspreset-classic)
for the full list.

### Preset and Standalone Differences

We recommended the preset because it is a backward-compatible, drop-in
replacement. On the other hand, the standalone dependencies:

- are more low-level
- require more setup
- do not include Workbench integrations

The preset registers plugins and themes such that they never conflict with one
another due to [swizzle clobbering](#swizzle-clobbering).

### Swizzle Clobbering

:::info tl;dr
Swizzling is **last-write-wins** so the order matters when registering plugins,
themes, and presets.
:::

:::note Background
Swizzling is _replacing_ the implementation of a theme component.

For example, if we wanted to change the table of contents, we define a new
`@theme/TOC/index.tsx` component through our site, plugin, or theme. Docusaurus then
replaces the original table of contents import alias with our new one.

See ["Why is it called swizzling?"](https://docusaurus.io/docs/swizzling) for
helpful comparisons to existing mental models.
:::

Note the use of the word "replacing" above. You might be tempted to compare
swizzling to an existing mental model such as OOP inheritance. This
unfortunately misses some nuance. Imagine this class inheritance structure or
its analogous `docusaurus.config.js`:

```mdx-code-block
<Tabs>
<TabItem value="Inheritance">
```

```text
Chair -> FourLeggedChair -> WoodChair
```

```mdx-code-block
</TabItem>
<TabItem value="docusaurus.config.js">
```

```js title="docusaurus.config.js"
module.exports = {
  themes: [
    '@docupotamus/docusaurus-theme-chair',
    '@docupotamus/docusaurus-theme-chair-four-legged',
    '@docupotamus/docusaurus-theme-chair-wood',
  ],
};
```

```mdx-code-block
</TabItem>
</Tabs>
```

You might expect an instance to have characteristics from all its parents. In
other words, our chair would have 4 legs and be made of wood. However, swizzling
is _replacing_ the implementation of a theme component. Our chair would only be
made of wood.

Docupotamus plugins, themes, and presets use a special _composition_
architecture pattern. If the same theme component (e.g. `@theme/TOC/index.tsx`)
is swizzled by more than 1 plugins, themes, and/or presets, we maintain the
features from all implementations.

## What's Next? {#future}

If you have comments, questions, or are looking to contribute, please start a
conversation over a
[GitHub issue](https://github.com/docupotamus/docupotamus/issues?q=is%3Aopen+is%3Aissue+label%3ACommon)!
