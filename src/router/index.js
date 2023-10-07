import { createRouter,createWebHashHistory } from 'vue-router'

const Home = () => import('../pages/Home/index.vue')
const Login = () => import('../pages/Login/index.vue')
const Hots = () => import('../pages/Hots/index.vue')


const routes = [
  { path: '/', component: Login },
  { path: '/home', component: Home },
  { path: '/hots', component: Hots },
]


const router = createRouter({
  history:createWebHashHistory(),
  routes, 
})

export default router

