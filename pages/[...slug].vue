<template>
    <div id="container">
        <div id="textcontainer" class="text-slate-200 break-words">
            <div v-if="page?.layout === 'blog'">
                <span>{{ new Date(page.date).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day:
                        'numeric'
                }) }}</span>
                <h1 class="text-4xl font-semibold mb-4">{{ page?.title }}</h1>
            </div>

            <ContentDoc :head="false">
                <template #not-found>
                    <div class="flex flex-col items-center justify-center">
                        <div class="bg-black py-12 px-16">
                            <NuxtImg src="/img/hu_tao_qixia.jpg" height="512"
                                class="outline outline-offset-4 outline-[1.5px] outline-slate-300" />
                            <div class="w-full bg-black text-center pt-8 font-semibold text-5xl font-[Lora]">
                                404
                                <div class="font-normal text-2xl font-sans">There&apos;s nothing here</div>
                            </div>
                        </div>
                    </div>
                </template>
            </ContentDoc>
        </div>
        <div id="comments" class="py-4">
            <Giscus repo="6ixfalls/sixfolio" repoId="R_kgDOH0g_pw" category="Blog" categoryId="DIC_kwDOH0g_p84CXeJP"
                mapping="pathname" strict="1" reactionsEnabled="1" emitMetadata="0" inputPosition="top"
                theme="transparent_dark" lang="en" loading="lazy" v-if="page?.comments_enabled" />
        </div>
    </div>
</template>
<script setup lang="ts">
import Giscus from "@giscus/vue";

const site = useSiteConfig();
const route = useRoute();
useHead({
    title: `sixfalls - ${route.path}`
});
const { data: page } = await useAsyncData('my-page', queryContent(route.path).findOne);
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
