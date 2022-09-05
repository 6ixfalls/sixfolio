import Home from './views/Home.vue'
import About from './views/About.vue'
import Projects from './views/Projects.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export let routes = [
  { path: '/', component: Home },
  { path: '/about', meta: { friendly: 'About' }, component: About },
  { path: '/projects', meta: { friendly: 'Projects' }, component: Projects },
]
