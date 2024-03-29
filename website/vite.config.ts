import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Unocss from 'unocss/vite';
import { presetUno, presetAttributify, presetIcons, presetMini } from 'unocss';

import renderTemplateMarkdownPlugin from './.vitepress/plugin/renderTemplateMarkdown';

export default {
  server: {
    hmr: {
      overlay: false,
    },
    fs: {
      allow: [resolve(__dirname, '..')],
    },
  },
  ssr: { noExternal: ['element-plus'] },
  plugins: [
    renderTemplateMarkdownPlugin(),
    Components({
      dirs: resolve(__dirname, '.vitepress/theme/components'),
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [ElementPlusResolver()],
      dts: './.vitepress/components.d.ts',
      transformer: 'vue3',
    }),
    AutoImport({
      imports: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [ElementPlusResolver()],
    }),
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
        presetMini({
          theme: {
            breakponts: {
              xs: '320px',
              sm: '640px',
              md: '960px',
              lg: '1280px',
            },
          },
        }),
      ],
      rules: [
        ['text-decoration-none', { 'text-decoration': 'none' }],
        [/^font-size-(\d+)$/, ([, d]) => ({ 'font-size': `${d}rem` })],
        [
          /^line-height-(\d+)$/,
          ([, d]) => ({ 'line-height': `${(Number(d) || 4) / 4}` }),
        ],
      ],
    }),
  ],
};
