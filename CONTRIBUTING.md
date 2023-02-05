# CONTRIBUTING

## ⚙️ Prerequisites

- [Node.js][1] `>=16.17`

- [pnpm][2] `>=7`

## 🔨 Development

```shell
$ git clone git@github.com:stevending1st/poster-friendly.git
$ cd poster-friendly
$ pnpm install
$ pnpm dev
```

## 🌲Project instructions

```text
.
├─.cache
├─.husky
├─.vscode
├─public
└─website
    ├─.vitepress
    │  ├─components (all components of the project)
    │  ├─plugin (all custom plugins for the project)
    │  ├─test
    │  └─utils (all utils of the project)
    ├─template (all templares of the project)
    │  └─...
    └─test
```

## 🤝 Contributing

### Bug

- When you find a bug, you can submit your issue. If you can fix it, please also submit an issue to confirm that it is really a bug before you do so.

- You can also find a bug in the issue list that no one has been assigned to and fix it.

### Add Template

If you have a template that you think can be used by other projects, you can contribute it to this project. Before that, you'll need to file an issue for the community to discuss.

The path of a template file is `/website/template/{template_category}/{template_name}/{template_version}/index.yaml`.

- `{template_category}`: `bug`.
- `{template_name}`: Name your template.
- `{template_version}`: `v1`, `v2`...

Each template file needs to add an `index.md` file in the same level of directory, even if it is an empty file, so that the template file information can be displayed on the web page.

See the [GitHub documentation][3] for more information on templates.

[1]: https://nodejs.org/en/
[2]: https://pnpm.io/
[3]: https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-githubs-form-schema
