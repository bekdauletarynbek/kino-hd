import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/index.vue'
import movie from '@/views/movie'
import categories from '@/views/categories'
import category from '@/views/category'
import List from '@/views/list'

Vue.use(VueRouter)

const routes = [
  {
    path: '/categories',
    name: 'categories',
    component: categories,
    children: [
      {
        path: ':id',
        name: 'category',
        component: category
      }
    ]
  },
  {
    path: '/watchlist',
    name: 'List',
    component: List
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: ':id',
        name: 'movie',
        component: movie
      },
      {
        path: 'tv/:id',
        name: 'tv',
        component: movie
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
