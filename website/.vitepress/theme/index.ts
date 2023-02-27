import DefaultTheme from 'vitepress/theme';
import {
  ID_INJECTION_KEY,
  ElCard,
  ElInput,
  ElForm,
  ElFormItem,
} from 'element-plus';
import 'uno.css';

import RenderForm from './components/render-form.vue';
import TemplateInfo from './components/template-info.vue';

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx);
    ctx.app.provide(ID_INJECTION_KEY, {
      prefix: 1024,
      current: 0,
    });
    ctx.app.component('ElCard', ElCard);
    ctx.app.component('ElInput', ElInput);
    ctx.app.component('ElForm', ElForm);
    ctx.app.component('ElFormItem', ElFormItem);
    ctx.app.component('RenderForm', RenderForm);
    ctx.app.component('TemplateInfo', TemplateInfo);
  },
};
