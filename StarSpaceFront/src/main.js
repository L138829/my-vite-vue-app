import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js';

createApp(App)
  .use(router) // 挂载路由器实例
  .mount('#app')
