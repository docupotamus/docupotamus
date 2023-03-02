---
sidebar_position: 3
---

# Developer Guide

### Publish to NPM

:::info
Remember to execute this command from the directory containing `package.json`.
:::

```shell
$ PACKAGE={{ PACKAGE }} \
    && VERSION={{ VERSION }} \
    && npm version ${VERSION} \
    && git add ../.. \
    && git commit -m "Update version for ${PACKAGE}." \
    && git tag --annotate ${PACKAGE}-v${VERSION} -m "${PACKAGE}-v${VERSION}" \
    && git push \
    && git push --tags \
    && npm publish --access=public
```

## Conventions

### Docusaurus

#### Swizzling

- **swizzle-no-eject**: Strongly prefer wrapping instead of ejecting. Ejecting
  breaks backward-compatibility, increases maintenance, and is significantly
  more complicated.

- **swizzle-layout**: Avoid swizzling `*/Layout` or `*/Layout/Provider` unless
  the changes are specific to layout. Instead use a non-`Layout` component
  higher up in the tree. This applies even when only adding a new provider.

<!-- DocPage/Layout/Provider == LayoutProvider == DocPage so .... just wrap Root unless you have a more specific feature -->

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
