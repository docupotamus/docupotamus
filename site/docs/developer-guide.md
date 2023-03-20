---
sidebar_position: 50
---

# Developer Guide

import { TaskList } from '@theme/docupotamus-task-list';

## How-To's

### Compare changes since the latest version

```shell
$ git log -- .
```

### Publish to NPM

:::danger
Remember to clear all pending changes (`git status`) first.
:::

:::info
Remember to execute this command from the directory containing `package.json`.
:::

```shell
# VERSION: Exclude the leading "v".
$ PACKAGE={{ PACKAGE }} \
    && VERSION={{ VERSION }} \
    && npm version ${VERSION} \
    && git add ../.. \
    && git commit -m "Update version for ${PACKAGE}." \
    && git tag --annotate ${PACKAGE}-v${VERSION} -m "${PACKAGE}-v${VERSION}" \
    && git push \
    && git push --tags \
    && npm publish --access=public \
    && cd ../.. \
    && grep -r ${PACKAGE} \
        --include package.json \
        --exclude-dir node_modules \
        --exclude-dir ${PACKAGE} \
        .
```

### Swizzle a component

:::note Under Construction 🚧
Thanks for your patience!
:::

```shell title="Example"
npm run swizzle @docusaurus/theme-classic {{ COMPONENT }} -- --typescript --wrap
```

- copy decorator and swizzle
- delete original
- if plugin, change original to init
- replace Init with just children
- rename Wrapper to Decorator
- fix React import
- 1 namespace rename

- rename original to init
- rename to init with 1 namespace
- rename component to Overwrite
- add Decorator with props
- readonly props

- add decorator to public with joined name
- update ambient

- preset
- copy swizzle but with decorator
- ambient
- package.json
- register index
- build and run

- site package.json

npm run watch everything

### Add a `ThemeConfig` setting

#### Setup

<TaskList>
- In `docusaurus-theme-foo.d.ts`, update `FooThemeConfig`, which is the source
  of truth.
- In `validateThemeConfig.ts`, update `DEFAULT_THEME_CONFIG`, which is for
  default values.
- Update `ThemeConfigSchema`, which is for validation.
- In `docupotamus.io`, update the `Configuration` section.
- If applicable, update the `Example Configuration` section.
</TaskList>

#### Usage

- In code that depends on the setting, import the `useFooThemeConfig` hook.

  ```typescript
  import useFooThemeConfig from '../../hooks/useFooThemeConfig';
  const { mySetting } = useFooThemeConfig();
  ```

- In the client `docusaurus.config.js`, update `themeConfig`, which is for
  customizing default values.

## Conventions

### Project Structure

- `src/theme/`

  - `decorators`: Theme components swizzled through wrapping. When the plugin
    option `swizzleIsEnabled` is set to `false` (if applicable), then these
    components are considered public and safe to be referenced. The most common
    use case is accounting for the same component (e.g. `DocItem`) being
    swizzled by more than 1 plugins, themes, and/or presets, resulting in
    [swizzle clobbering](./presets/preset-classic.md#swizzle-clobbering). The
    directory trees between `decorators` and `swizzle` are always equal to one
    another.

  - `swizzle`: This is the theme path analogous to where Docusaurus sites put
    swizzled theme components. When the plugin option `swizzleIsEnabled` is set
    to `true` (if applicable), then these components are automatically added to
    the [theme import aliases](https://docusaurus.io/docs/advanced/client). The
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

- **swizzle-scope**: Prefer swizzling the smallest scope. For example,
  swizzle `DocItem/Content` instead of `DocItem`.

- **swizzle-provider-global**: Prefer swizzling `Root` instead of `DocPage` when
  adding a new global provider.

- **swizzle-layout**: Avoid swizzling `*/Layout` or `*/Layout/Provider` unless
  the changes are specific to layout. Instead use a non-`Layout` component
  higher up in the tree. This applies even when only adding a new provider.

### JavaScript / TypeScript

- **typescript-module-doc8**: When choosing between the
  `@docupotamus/docusaurus-theme-foo`, `@docupotamus/theme-foo`, and
  `@doc8/theme-foo` module aliases, prefer using `@doc8/theme-foo`.

- **log-message-suggestion**: Prefer including a suggestion for what developers
  can try to fix their problem. For example, "Failed to open file.txt. Try
  checking that this file exists and has the correct permissions."

- **log-message-no-wrap**: Do not wrap source code with messages where the
  intended reader is a developer instead of a user. The most common examples are
  errors and logs. The justification is to facilitate searching.

### Styling

#### Styled-Components

- **styled-components-group-selector**: Prefer `Array.join()` for group
  selectors. This prevents bugs from including a trailing comma. For example:

```js
const StyledBox = styled(Box)({
  [['& .one', '& .two'].join(', ')]: {
    backgroundColor: 'red',
  },
});
```

- **styled-components-performance**: Do not use styled-components
  (e.g., `styled(Box)`) with parameters that change very frequently. This is
  very slow because styled-components appends a new `<style>` tag to the
  `<head>` tag on each change. Instead use inline styles.

#### CSS

- **css-class-bem**: Use a modified BEM naming convention for classes. Use
  PascalCase for blocks, and camelCase for elements and modifiers. For
  delimiters, use underscores to facilitate being used as object keys in
  TypeScript.

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

### Markdown / MDX

- **markdown-keywords-marketing**: Use title casing for marketing keywords. Here
  is an exhaustive list:

  - Toolbar
  - Workbench

- **markdown-admonition-tldr**: Prefer using the `info` admonition for TL:DR's.

- **markdown-heading-imperative**: Headings that are imperative sentences use
  sentence casing. Do not use title casing. For example, "Do a thing" and not
  "Do a Thing".
