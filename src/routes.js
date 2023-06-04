import { Buffer } from 'buffer';
globalThis.Buffer = Buffer;
import * as matter from 'gray-matter';
import Page from './views/Page.vue';

/** @type {import('vue-router').RouterOptions['routes']} */
const builtRoutes = [];

function addRoute(page, pageContent) {
  const pageName = page.replace('./pages/', '').replace('.md', '');
  const path = pageName === 'index' ? '/' : `/${pageName}`;
  const { data, content } = matter(pageContent);
  builtRoutes.push({
    path,
    component: Page,
    meta: { friendly: data.title },
    props: { content, data },
  });
}

// Create routes for all pages (index, about, blog, etc)
const pages = import.meta.glob(['./pages/*.md', './pages/**/*.md'], { as: 'raw', eager: true });
for (const page in pages) {
  addRoute(page, pages[page]);
};

export let routes = builtRoutes;