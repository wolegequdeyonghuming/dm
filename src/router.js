import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Random from './views/Random.vue'
import Finder from './views/Finder.vue'
import Shuffle from './views/Shuffle.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/fd',
      name: 'finder',
      component: Finder
    },
    {
      path: '/rd',
      name: 'random',
      component: Random
    },
    {
      path: '/sf',
      name: 'shuffle',
      component: Shuffle
    }
  ]
})
