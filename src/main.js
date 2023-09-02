import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Http from './api'

const app = createApp(App)

app.config.globalProperties.$http = Http


app.use(router)
app.use(ElementPlus)


app.mount('#app')
