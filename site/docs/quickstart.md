---
sidebar_position: 0
---

# Quickstart

import { TaskList } from '@theme/docupotamus-task-list';
import Slide from '@site/src/components/QuickstartSlide';

Docupotamus is a productivity suite of Docusaurus plugins, dedicated to making
all developers even _faster_.

<Slide/>

It bundles a minimalist design, unified add-on interface, and powerful
built-ins - all fully interoperable with your existing site.

## From Zero to Hippo Hero

:::tip
In the right-docked Toolbar, open the "Task List" tab to track your progress.
:::

<TaskList>
- Install Node.js.
- Create a new site.
- Install and register the Docupotamus preset.
- Start your site.
</TaskList>

#### Install Node.js

:::tip
If you have an existing Docusaurus site, you can skip this step.
:::

Install [Node.js](https://nodejs.org/en/download/) version 16.14 or higher.

#### Create a new site

:::tip
If you have an existing Docusaurus site, you can skip this step.
:::

:::note
If you are having trouble setting up Docusaurus, see the
[source documentation](https://docusaurus.io/docs#fast-track).
:::

:::tip
In the right-docked Toolbar, open the "Environment Variables" tab to personalize
these snippets!
:::

```shell
SITE_NAME="{{ SITE_NAME=my-site }}" \
    && npx create-docusaurus@latest $SITE_NAME classic \
    && cd $SITE_NAME
```

#### Install and register the Docupotamus preset

```shell npm2yarn
npm install --save @docupotamus/docusaurus-preset-classic
```

Then register it in your site's `docusaurus.config.js`:

```js title="docusaurus.config.js"
module.exports = {
    presets: [
        [
            // Change this line to match the following.
            // highlight-next-line
            '@docupotamus/docusaurus-preset-classic',
            ({
                docs: ...
            }),
        ],
    ],
};
```

#### Start your site

```shell
npm run start
```

## I am bad at spelling

We got you. Use "doc8" as an abbreviation for Docupotamus.

For example, try navigating to [doc8.io](https://www.doc8.io).

```text title="Why the number 8?"
d o c u p o t a m u s
      ^             ^
      1 2 3 4 5 6 7 8
```

## What's Next?

Good first places to start are learning more about the [differences between Docupotamus and Docusaurus](./presets/preset-classic.md#docusaurus-differences)
or [creating a task list](./themes/theme-task-list#example-usage) just like the
one on this page. Try it out!
