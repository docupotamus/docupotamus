---
sidebar_position: 0
---

# Quickstart

Docupotamus is a productivity suite of Docusaurus plugins, dedicated to making
all developers even _faster_.

It bundles a minimalist design, unified add-on interface, and powerful
built-ins - all fully interoperable with your existing site.

## From Zero to Fast Hippo

#### Install Node.js

:::tip
If you have an existing Docusaurus site, you can skip this step.
:::

Install [Node.js](https://nodejs.org/en/download/) version 16.14 or higher.

#### Create a new site

:::tip
If you have an existing Docusaurus site, you can skip this step.
:::

```shell
npx create-docusaurus@latest my-site classic && cd my-site
```

#### Install the Docupotamus preset

```shell npm2yarn
npm install --save @docupotamus/docusaurus-preset-classic
```

#### Register the Docupotamus preset

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

```text
d o c u p o t a m u s
      ^             ^
      1 2 3 4 5 6 7 8
```

## What's Next?

A good first place to start is [creating a task list](./themes/theme-task-list#example-usage)
just like the one on this page. Try it out!
