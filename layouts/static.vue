<template>
    <div id="container">
        <div id="textcontainer" class="text-slate-200 break-words">
            <div v-if="page.layout === 'blog'">
                <span>{{ new Date(page.date).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day:
                        'numeric'
                }) }}</span>
                <h1 class="text-4xl font-semibold mb-4">{{ page.title }}</h1>
            </div>
            <slot />
        </div>
        <div id="comments" class="py-4">
            <Giscus repo="6ixfalls/sixfolio" repoId="R_kgDOH0g_pw" category="Blog" categoryId="DIC_kwDOH0g_p84CXeJP"
                mapping="pathname" strict="1" reactionsEnabled="1" emitMetadata="0" inputPosition="top"
                theme="transparent_dark" lang="en" loading="lazy" v-if="page.comments_enabled" />
        </div>
    </div>
</template>
<script setup lang="ts">
import Giscus from "@giscus/vue";

const site = useSiteConfig();
const route = useRoute();
useHead({
    title: `sixfalls - ${route.path}`,
    link: [{ rel: 'canonical', href: `https://sixfal.ls${route.path}` }]
});
const { page } = useContent();
if (page.value) {
    useSeoMeta({
        ogTitle: route.path === "/" ? "sixfalls" : page.value.title,
        description: page.value.description,
        ogDescription: page.value.description,
        ogImage: page.value.image,
        ogUrl: site.url + route.path,
        twitterCard: 'summary_large_image',
    });
    if (!page.value.image) {
        defineOgImage({
            title: route.path === "/" ? "sixfalls" : page.value.title,
            description: page.value.description,
            component: "Page",
        });
    }
}
</script>
