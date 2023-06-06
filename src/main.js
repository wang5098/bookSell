import { createApp } from 'vue'
import App from './App.vue'
// 导入上面新建的路由文件
import router from './router'
createApp(App).use(router).mount('#app')
