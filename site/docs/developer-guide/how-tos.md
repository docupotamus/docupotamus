---
sidebar_position: 50
---

# How-To's

import { TaskList } from '@theme/docupotamus-task-list';

## Docusaurus

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

### Swizzle a component

:::note Under Construction 🚧
Thanks for your patience!
:::

```shell title="Example"
npm run swizzle @docusaurus/theme-classic {{ COMPONENT }} -- --typescript --wrap
```

- readonly props
- if plugin, change original to init
- rename to init with 1 namespace
- fix React import

- copy decorator and swizzle
- delete original
- replace Init with just children
- rename Wrapper to Decorator

- rename component to Overwrite
- add Decorator with props

- add decorator to public with joined name
- update ambient

- preset
- copy swizzle but with decorator
- pass props
- rename to wrapper
- ambient
- package.json
- register index
- build and run

- site package.json

npm run watch everything

### Add a preset feature gate

<TaskList>
- [Prerequisite] Get the preset key using the preset-key convention.
- Check if there are plugin options.
- In `preset-classic.md`, document the preset key.
- In `awesome.md`, document the preset key.
- In `options.ts`, add the property.
- In `index.ts`, destructure the property even if it is unused.
- In the `useIsEnabled.tsx` hook, update the PluginKey.
- Search for all import references `grep -rl "@theme/docupotamus-template" src/`.
- call hook or use ConditionalWrap
- test with docusaurus.config.js
</TaskList>

## Release

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
