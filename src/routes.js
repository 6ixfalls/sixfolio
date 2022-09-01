import Home from './views/Home.vue'
import About from './views/About.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export let routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]
