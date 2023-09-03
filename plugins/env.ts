export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide("env", {
        isClientSide: process.client,
    });
});
