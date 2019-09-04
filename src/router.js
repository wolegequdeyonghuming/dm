import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Shuffle from './views/Shuffle.vue'
import Pool from './views/Pool.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/sf',
      name: 'shuffle',
      component: Shuffle
    },
    {
      path: '/pl',
      name: 'pool',
      component: Pool
    }
  ]
})
