import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons, presetMini } from 'unocss'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      resolvers: [
        ElementPlusResolver()
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
      ],
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
              }
            }
          }),
      ],
      rules: [
      ],
    }),
  ]
})
