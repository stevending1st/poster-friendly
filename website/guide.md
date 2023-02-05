---
layout: doc
---

# Guide

## What is Poster friendly？

Poster friendly is a complete solution for GitHub (Gitee) Issue and Discussion templates. This means that you can use it to create templates quickly.

::: warning

1. We only support [GitHub's form](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-githubs-form-schema) for now, maybe [markdown](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/manually-creating-a-single-issue-template-for-your-repository) in the future.
2. At present, the feature is experimental, the URL and API are still unstable, and we do not recommend that you use it in your major projects.

:::

## How to create an issue/discussion template for my project?

### First, you need to decide on a template.

### Second, create the issue template link.

<ClientOnly>
  <configuration-form />
</ClientOnly>

### Third, use template links.

## API

### Template Page

#### Request

| Name        | Description |
| ----------- | :---------- |
| HTTP URL    | `/poster`   |
| HTTP Method | Get         |

#### Parameter

| Name            | Types  | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------- | :----: | :------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| owner           | string |   Yes    | Owner of the repository.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| name            | string |   Yes    | Name of the repository.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| templateURL     | string |   Yes    | URL of the template. You can upload the template to GitHub or Gitee and set its link to this value.                                                                                                                                                                                                                                                                                                                                                                                                                 |
| postDestination | string |   Yes    | Destination for the use of the template.<br>**Optional Value:**<ul class="my-0"><li>`GitHub_issue`: An **issue** will be created for the **GitHub** repository.</li><li>`GitHub_discussion`: A **discussion** will be created for the **GitHub** repository.</li><li>`Gitee_issue`: An **issue** will be created for the **Gitee** repository.</li></ul> If there is more than one destination, you can use `,` intervals to concatenate into strings.<br>**e.g:** `GitHub_issue`, `GitHub_issue,GitHub_discussion` |

<script>
import 'element-plus/theme-chalk/dark/css-vars.css';
import 'uno.css';

const origin = location?.origin;
</script>
