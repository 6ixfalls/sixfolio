<template>
    <div id="container">
        <div id="textcontainer" class="text-slate-200 break-words">
            <div id="md-card-container" class="md:grid lg:grid-cols-1 2xl:grid-cols-2 desktop:!grid-cols-2 gap-8 my-8">
                <BlogPost v-for="article in articles" :key="article._path" :title="article.title"
                    :description="article.description" :path="article._path" :image="article.image" :date="article.date" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const site = useSiteConfig();
const route = useRoute();
useHead({
    title: `sixfalls - /blog`,
    link: [{ rel: 'canonical', href: `https://sixfal.ls${route.path}` }]
});
const { data: articles } = await useAsyncData('articles', queryContent('/blog/').only(["_extension", "_path", "title", "description", "image", "date"]).where({ _extension: { $in: ["md"] } }).sort({ date: 1 }).find);
const { data: page } = await useAsyncData('blog-page', queryContent(route.path).findOne, { watch: [route] });
if (page.value) {
    useSeoMeta({
        ogTitle: page.value.title,
        description: page.value.description,
        ogDescription: page.value.description,
        ogImage: page.value.image,
        ogUrl: site.url + "/blog",
        twitterCard: 'summary_large_image',
    });
    if (!page.value.image) {
        defineOgImage({
            title: page.value.title,
            description: page.value.description,
            component: "Page",
        });
    }
}
</script>
