---
sidebar_position: 1
---

# 📦 theme-common

<!-- <APITable> -->

A Docusaurus theme with a lightweight, unified interface for developing add-ons.

## Try It Out

### Common Use Cases

Use this when you want to enhance your site with powerful **add-ons**.

You can integrate custom React components through a lightweight, unified interface. They are then always readily accessible to developers through the workbench.

For example, integrating with the workbench is how [theme-task-list](./theme-task-list.md) works.

### Plugin and Add-On Differences

:::tip tl;dr
Add-ons are at a conceptually smaller scope and can be more standalone.
:::

Plugins and themes that provide UI components often [swizzle](https://docusaurus.io/docs/swizzling) through ejecting or wrapping. On the other hand, add-ons are at a conceptually smaller scope and can be (but of course are not limited to being) more standalone. For a trivial example, imagine integrating a glossary, `git blame` history, or even calculator add-on.

## Installation

:::tip
If you use the preset `@docupotamus/docusaurus-preset-classic`, you don't need
to install this as a dependency because it is already included.
:::

```bash npm2yarn
$ npm install --save @docupotamus/docusaurus-theme-common
```
