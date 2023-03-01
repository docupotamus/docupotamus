---
sidebar_position: 3
---

# Developer Guide

### Publish to NPM

:::info
Remember to execute this command from the directory containing `package.json`.
:::

```shell
$ npm version {{ VERSION }} \
    && git push \
    && git push --tags \
    && npm publish --access=public
```

## Conventions

### CSS

#### Custom Properties

- **css-namespace-public**: Only custom properties that start with the common
  namespace or a project-specific namespace (see below) are considered public.
  Other symbols are considered private and _unsafe_ to be referenced. Their APIs
  are unstable and breaking changes might occur.

- **css-namespace-common**: Styles common across multiple projects use the
  `--doc8` namespace prefix. For example, `--doc8-color-primary`.

- **css-namespace-project**: Styles specific to a single project use the
  `--${project-abbreviation}` namespace prefix. For example,
  `--tl-color-primary` where "tl" is an abbreviation for
  "@docupotamus/docusaurus-theme-**t**ask-**l**ist".
