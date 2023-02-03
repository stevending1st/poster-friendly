import type { Plugin } from 'vite';

import fs from 'fs-extra';
import yaml from 'yaml';
import matter from 'gray-matter';

const reConfigFile = /(\S*website[\/\\]template\S*[\/\\])([^/\\\s]+\.md)$/;

const dealEscape = (str?: string) => str?.replaceAll('`', '\u{5C}\u{60}') || '';

export const readYamlFile = async (yamlFolder: string) => {
  const yamlPath = yamlFolder + 'index.yaml',
    ymlPath = yamlFolder + 'index.yml',
    readFile = async (filePath: string): Promise<string> =>
      (await fs.readFile(filePath)).toString();

  try {
    if (await fs.existsSync(ymlPath)) {
      return readFile(ymlPath);
    } else if (await fs.existsSync(yamlPath)) {
      return readFile(yamlPath);
    }
  } catch (error: unknown) {
    console.log(error);
  }
  return;
};

export const mdFrontmatter = (name?: string) => `---
title: ${name}
editLink: true
---\n`;

export const mdScript = (content?: string) => `\n<script setup lang="ts">
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import "uno.css";

import {
  FormInfoType,
  getFormItemAndData,
} from './../../../../.vitepress/utils/form';
import yaml from 'yaml';

const info = ref<FormInfoType>({ name: '', description: '' });
const rules = ref<FormRules>({});
const data = ref<FormDataType>({});

const yamlData = yaml.parse(\`${content || ''}\`);
const [thisFormInfo, thisRules, thisData] = getFormItemAndData(yamlData);

info.value = thisFormInfo;
rules.value = thisRules;
data.value = thisData;
</script>\n`;

export const mdMeta = (name?: string, description?: string) => `# ${name}

${description}\n`;

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
  reConfigFile.lastIndex = 0;
  if (reConfigFile.test(id)) {
    console.log('🚀 id--->', id, 'src--->', src);

    reConfigFile.lastIndex = 0;
    const configFileFolder = reConfigFile.exec(id)?.[1];
    const yamlFileString =
      configFileFolder && (await readYamlFile(configFileFolder));
    const config = yaml.parse(yamlFileString || '');
    const { content: mdFileContentString } = matter(src);
    const code =
      mdFrontmatter(config?.name) +
      mdScript(dealEscape(yamlFileString)) +
      mdMeta(config?.name, config?.description) +
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
