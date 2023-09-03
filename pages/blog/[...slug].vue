<template>
    <div id="container">
        <div id="textcontainer" class="text-slate-200 break-words">
            <ContentDoc :head="false" />
        </div>
        <div id="comments" class="py-4">
            <Giscus repo="6ixfalls/sixfolio" repoId="R_kgDOH0g_pw" category="Blog" categoryId="DIC_kwDOH0g_p84CXeJP"
                mapping="pathname" strict="1" reactionsEnabled="1" emitMetadata="0" inputPosition="top"
                theme="transparent_dark" lang="en" loading="lazy" />
        </div>
    </div>
</template>
<script setup lang="ts">
import Giscus from "@giscus/vue";
const route = useRoute();
useHead({
    title: `sixfalls - /${route.params.slug}`
});
const { data: page } = await useAsyncData('my-page', queryContent(`/${route.params.slug}`).findOne);
if (page.value) {
    useSeoMeta({
        ogTitle: page.value.title,
        description: page.value.description,
        ogDescription: page.value.description,
        ogImage: page.value.image,
        ogUrl: `https://sixfal.ls/${route.params.slug}`,
        twitterCard: 'summary_large_image',
    });
}
</script>