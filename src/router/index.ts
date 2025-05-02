import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"
import PostList from "../pages/PostList.vue"


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'PostList',
    component: PostList
  },
  // {
  //   path: '/posts/:id',
  //   name: 'PostDetails',
  //   component: PostDetails,
  //   props: true
  // }
] 


const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router