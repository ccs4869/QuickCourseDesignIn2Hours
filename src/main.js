import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import http from './api'

import ci from 'cheerio'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)

// axios.get('http://localhost:3000/data').then(res=>console.log("res---------->",res))

http.get('/data').then(res => { 
const $ = ci.load(res.data)
  
  console.log("res---------->",$('.uni-blk-list02.list-a.list-0427 li'))
})

app.mount('#app')
