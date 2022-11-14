import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import 'uno.css'

import './style.css'
import App from './App.vue'
import router from './router/index'

createApp(App).use(router).mount('#app')
