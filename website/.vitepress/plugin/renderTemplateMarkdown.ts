import type { Plugin } from 'vite';

import fs from 'fs-extra';
import yaml from 'yaml';
import matter from 'gray-matter';

const reConfigFile = /(\S*website[\/\\]template\S*[\/\\])([^/\\\s]+\.md)$/;

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
---
`;

export const mdScript = () => `\n<script setup>
import "uno.css";
</script>\n`;

export const mdMeta = (name?: string, description?: string) => `# ${name}

${description}
`;

export const mdYamlCode = (yamlString: string) => `## Yaml File

\`\`\`yaml
${yamlString}
\`\`\`
`;

export const transform = async (src: string, id: string) => {
  if (!id.includes('template')) return src;
  reConfigFile.lastIndex = 0;
  if (reConfigFile.test(id)) {
    console.log('🚀 test,transform--->', id, src);

    reConfigFile.lastIndex = 0;
    const configFileFolder = reConfigFile.exec(id)?.[1];
    const yamlFileString =
      configFileFolder && (await readYamlFile(configFileFolder));
    const config = yaml.parse(yamlFileString || '');
    const { content: mdFileContentString } = matter(src);
    const code =
      mdFrontmatter(config?.name) +
      mdScript() +
      mdMeta(config?.name, config?.description) +
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
