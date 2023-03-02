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

### Project Structure

- `src/theme/`

  - `decorators`: Theme components swizzled through wrapping. When the plugin
    option `swizzleIsEnabled` is set to `false` (if applicable), then these
    components are considered public and safe to be referenced. The most common
    use case is accounting for the same component (e.g. `DocItem`) being
    swizzled by more than 1 plugins, themes, and/or presets, resulting in
    [theme alias stack](https://docusaurus.io/docs/advanced/client) overwriting
    through "last-import-wins". The directory trees between `decorators` and
    `swizzle` are always equal to one another.

  - `swizzle`: This is the theme path analogous to where docusaurus sites put
    swizzled theme components. When the plugin option `swizzleIsEnabled` is set
    to `true` (if applicable), then these components are automatically added to
    the [theme aliases stack](https://docusaurus.io/docs/advanced/client). The
    directory trees between `decorators` and `swizzle` are always equal to one
    another.

### git and GitHub

- **git-commit-message**: Use the template below. Note the verb is formatted as
  uppercase and the message always ends with punctuation.

  ```text
  // Template
  [${scope}] ${Verb} ${change} for ${target} ${targetType}.

  // Example
  [theme-foo] Add handleClick for Button component.
  ```

### Docusaurus

#### Swizzling

- **swizzle-no-eject**: Strongly prefer wrapping instead of ejecting. Ejecting
  breaks backward-compatibility, increases maintenance, and is significantly
  more complicated.

- **swizzle-provider-global**: Prefer swizzling `Root` instead of `DocPage` when
  adding a new global provider.

- **swizzle-layout**: Avoid swizzling `*/Layout` or `*/Layout/Provider` unless
  the changes are specific to layout. Instead use a non-`Layout` component
  higher up in the tree. This applies even when only adding a new provider.

### JavaScript / TypeScript

- **log-message-suggestion**: Prefer including a suggestion for what developers
  can try to fix their problem. For example, "Failed to open file.txt. Try
  checking that this file exists and has the correct permissions."

- **log-message-no-wrap**: Do not wrap source code with messages where the
  intended reader is a developer instead of a user. The most common examples are
  errors and logs. The justification is to facilitate searching.

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
