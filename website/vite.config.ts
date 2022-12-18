import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Unocss from 'unocss/vite';
import { presetUno, presetAttributify, presetIcons, presetMini } from 'unocss';

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
    Components({
      dirs: ['.vitepress/components', '.vitepress/pages'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [ElementPlusResolver()],
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
        [
          /^font-size-(\d+)$/,
          ([, d]) => ({ 'font-size': `${d}rem !important` }),
        ],
      ],
    }),
  ],
};
