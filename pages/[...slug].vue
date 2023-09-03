<template>
    <div id="textcontainer" class="text-slate-200 break-words">
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
