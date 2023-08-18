import * as Vue from "vue";
import { createHead } from "@unhead/vue";
import "./assets/main.css";
import App from "./App.vue";
import { routes } from "./routes.js";
import { createRouter, createWebHistory } from "vue-router";

const app = Vue.createApp(App);
const router = createRouter({
    history: createWebHistory(),
    routes: import.meta.hot ? [] : routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    },
});
const head = createHead();

if (import.meta.hot) {
    let removeRoutes = [];

    for (let route of routes) {
        removeRoutes.push(router.addRoute(route));
    }

    import.meta.hot.accept("./routes.js", ({ routes }) => {
        for (let removeRoute of removeRoutes) removeRoute();
        removeRoutes = [];
        for (let route of routes) {
            removeRoutes.push(router.addRoute(route));
        }
        router.replace("");
    });
}

app.use(router);
app.use(head);

app.mount("#app");
