import Home from './views/Home.vue'
import Projects from './views/Projects.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export let routes = [
  { path: '/', meta: { friendly: 'About' }, component: Home },
  { path: '/projects', meta: { friendly: 'Projects' }, component: Projects },
]
