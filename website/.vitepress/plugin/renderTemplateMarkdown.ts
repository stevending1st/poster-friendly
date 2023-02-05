import type { StatsBase } from 'fs';
import type { Plugin } from 'vite';

import fs from 'fs-extra';
import yaml from 'yaml';
import matter from 'gray-matter';
import { filesize } from 'filesize';

const reConfigReadmeFile =
  /(\S*website[\/\\]template\S*[\/\\])([^/\\\s]+\.md)$/;
const reConfigFileRelAdr = /website[\/\\]template\S*[\/\\][^/\\\s]+\.ya?ml$/g;

const dealEscape = (str?: string) => str?.replaceAll('`', '\u{5C}\u{60}') || '';

export const getRelativeRoute = (readmeFilePath: string) => {
  reConfigFileRelAdr.lastIndex = 0;
  const configFileRelativePath = reConfigFileRelAdr
    .exec(readmeFilePath)?.[0]
    ?.replaceAll('\\', '/');
  return configFileRelativePath;
};

export const readYamlFile = async (yamlFolder: string) => {
  const yamlPath = yamlFolder + 'index.yaml',
    ymlPath = yamlFolder + 'index.yml',
    readFile = async (filePath: string): Promise<string> =>
      (await fs.readFile(filePath)).toString(),
    readFileInfo = async (filePath: string): Promise<StatsBase<number>> =>
      await fs.statSync(filePath);

  try {
    if (await fs.existsSync(ymlPath)) {
      const content = await readFile(ymlPath);
      const { mtimeMs, size } = await readFileInfo(ymlPath);
      return { content, mtimeMs, size, path: ymlPath };
    } else if (await fs.existsSync(yamlPath)) {
      const content = await readFile(yamlPath);
      const { mtimeMs, size } = await readFileInfo(yamlPath);
      return { content, mtimeMs, size, path: yamlPath };
    }
  } catch (error: unknown) {
    console.log(error);
  }
  return {};
};

export const mdFrontmatter = (name?: string) => `---
title: ${name}
editLink: true
---\n`;

export const mdScript = (content?: string) => `\n<script setup lang="ts">
import { ref } from "vue";
import yaml from "yaml";
import "uno.css";
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';

import {
  FormInfoType,
  getFormItemAndData,
} from './../../../../.vitepress/utils/form';

const info = ref<FormInfoType>({ name: '', description: '' });
const rules = ref<FormRules>({});
const data = ref<FormDataType>({});

const yamlData = yaml.parse(\`${content || ''}\`);
const [thisFormInfo, thisRules, thisData] = getFormItemAndData(yamlData);

info.value = thisFormInfo;
rules.value = thisRules;
data.value = thisData;
</script>\n`;

export const mdMeta = (
  name?: string,
  relativeRoute?: string,
  description?: string,
  updateTime?: string,
  fileSize?: string,
) => `\n# ${name}

<TemplateInfo updateTime="${updateTime}" fileSize="${fileSize}" relativeRoute="${relativeRoute}" />
<p class="mt-4">${description}</p>\n`;

export const mdYamlCode = (yamlString: string) => `\n## Yaml File

\`\`\`yaml
${yamlString}
\`\`\`\n\n`;

export const renderForm = `\n## Preview
<el-card>
  <el-form class="mb-10" ref="formRef" size="large" label-position="top">
    <RenderForm :formInfo="info" :rules="rules" :data="data">
      <template v-slot:title>
        <el-form-item
          class="mt-6 mb-10!"
          label="Title"
          required
          prop="title"
        >
          <el-input v-model="data.title" />
        </el-form-item>
      </template>
    </RenderForm>
  </el-form>
</el-card>\n`;

export const transform = async (src: string, id: string) => {
  if (!id.includes('template')) return src;
  reConfigReadmeFile.lastIndex = 0;
  if (reConfigReadmeFile.test(id)) {
    console.log('🚀 id--->', id, 'src--->', src);

    reConfigReadmeFile.lastIndex = 0;
    const configFileFolder = reConfigReadmeFile.exec(id)?.[1];
    const {
      content: yamlFileString,
      path,
      mtimeMs,
      size,
    } = (configFileFolder && (await readYamlFile(configFileFolder))) || {};
    const updateTime = mtimeMs ? new Date(mtimeMs).toISOString() : undefined;
    const fileSize = size ? filesize(size) : undefined;
    const config = yaml.parse(yamlFileString || '');
    const { content: mdFileContentString } = matter(src);
    const relativeRoute = getRelativeRoute(path || '');
    const code =
      mdFrontmatter(config?.name) +
      mdScript(dealEscape(yamlFileString)) +
      mdMeta(
        config?.name,
        relativeRoute,
        config?.description,
        updateTime,
        fileSize?.toString(),
      ) +
      renderForm +
      (yamlFileString && mdYamlCode(yamlFileString)) +
      mdFileContentString;
    return code;
  }
};

export default function renderTemplateMarkdownPlugin(): Plugin {
  return {
    name: 'render-template-markdown',
    enforce: 'pre',
    transform,
  };
}
