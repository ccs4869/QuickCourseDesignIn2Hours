import { createRouter,createWebHashHistory } from 'vue-router'

const Home = () => import('../pages/Home/index.vue')
const Login = ()=>import('../pages/Login/index.vue')

const routes = [
  { path: '/', component: Login },
  { path: '/home', component: Home },
]


const router = createRouter({
  history:createWebHashHistory(),
  routes, 
})

export default router

