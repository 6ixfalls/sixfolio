<template>
    <div id="textcontainer" class="text-slate-200 break-words">
        <ContentDoc :head="false" />
    </div>
</template>
<script setup lang="ts">
const route = useRoute();
useHead({
    title: `sixfalls - /${route.params.slug}`
});
const { data: page } = await useAsyncData('my-page', queryContent(`/${route.params.slug}`).findOne);
if (page.value) {
    useSeoMeta({
        ogTitle: route.params.slug === "" ? "sixfalls" : page.value.title,
        description: page.value.description,
        ogDescription: page.value.description,
        ogImage: page.value.image,
        ogUrl: `https://sixfal.ls/${route.params.slug}`,
        twitterCard: 'summary_large_image',
    });
}
</script>