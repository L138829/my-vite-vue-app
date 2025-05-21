import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js';
// ——— 全局引入 Element Plus ———
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'



createApp(App)
  .use(router) // 挂载路由器实例
  .use(ElementPlus) // 挂载 Element Plus
  .mount('#app')
