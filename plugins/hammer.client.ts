import Hammer from "hammerjs";
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide("Hammer", Hammer);
});
