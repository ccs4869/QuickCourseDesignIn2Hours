import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Http from './api'

import ci from 'cheerio'
import format from './utils/format'

const app = createApp(App)

app.config.globalProperties.$http = Http


app.use(router)
app.use(ElementPlus)

// axios.get('http://localhost:3000/data').then(res=>console.log("res---------->",res))


app.mount('#app')
