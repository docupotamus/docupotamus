---
sidebar_position: 1
---

# 📦 theme-common

<!-- Provides the Docs functionality and is the default docs plugin for Docusaurus. -->
<!-- <APITable> -->

## Installation

:::tip
If you use the preset `@docupotamus/docusaurus-preset-classic`, you don't need
to install this as a dependency because it is already included.
:::

```bash npm2yarn
$ npm install --save @docupotamus/docusaurus-theme-common
```

## Customizing and Configuring

### Add a Workbench Tab

- In `docusaurus-theme-foo.d.ts`, update `FooThemeConfig`, which is the source
  of truth.

- In `validateThemeConfig.ts`, update `DEFAULT_THEME_CONFIG`, which is for
  default values.

- Update `ThemeConfigSchema`, which is for validation.
