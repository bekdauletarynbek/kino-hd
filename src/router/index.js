import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/index.vue'
import movie from '@/views/movie'
import tv from '@/views/tv'
import categories from '@/views/categories'
import category from '@/views/category'
import Buy from '@/views/buy'
import List from '@/views/list'
import Purchase from '@/views/purchases'

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
    path: '/buy',
    name: 'Buy',
    component: Buy
  },
  {
    path: '/watchlist',
    name: 'List',
    component: List
  },
  {
    path: '/purchases',
    name: 'Purchase',
    component: Purchase
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: (route) => ({ query: route.query.fl }),
    children: [
      {
        path: ':id',
        name: 'movie',
        component: movie
      },
      {
        path: 'tv/:id',
        name: 'tv',
        component: tv
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
