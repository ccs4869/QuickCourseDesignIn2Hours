import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import http from './api'

// axios.get('http://localhost:3000/data').then(res=>console.log("res---------->",res))
http.get('/data').then(res=>console.log("res---------->",res))

createApp(App).mount('#app')
