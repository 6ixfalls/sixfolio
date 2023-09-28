<template>
    <OptionalLink :href="path">
        <CardWrapper :transitionSpeed="500" :tiltMaxAngleX="8" :tiltMaxAngleY="8" :scale="1.06" :tiltReverse="true"
            :glareEnable="true" glareBorderRadius="0.25rem" :glareMaxOpacity="0.17">
            <div ref="wrapper" class="w-full">
                <div ref="movement" id="movement"
                    class="w-full h-full rounded bg-neutral-800 shadow-xl overflow-hidden flex flex-col">
                    <div class="w-full p-0 flex justify-center items-center aspect-og pt-[52.5%] relative h-0">
                        <div class="w-full h-full aspect-og top-0 left-0 absolute animate-pulse bg-neutral-800" />
                        <NuxtImg :src="image ? image : `${path}/__og_image__/og.png`"
                            class="object-cover w-full aspect-og absolute top-0 left-0" v-if="image" />
                        <img :src="image ? image : `${path}/__og_image__/og.png`"
                            class="object-cover w-full aspect-og absolute top-0 left-0" v-if="!image" />
                    </div>
                    <div class="w-full px-6 pt-5 pb-8">
                        {{ resolvedDate && resolvedDate.toLocaleDateString('en-US', {
                            year: 'numeric', month: 'long', day:
                                'numeric'
                        }) }}
                        <div class="text-lg font-semibold mb-1">{{ title }}</div>
                        {{ description }}
                    </div>
                </div>
            </div>
        </CardWrapper>
    </OptionalLink>
</template>
<script setup lang="ts">
interface Props {
    title?: string,
    description?: string,
    path?: string,
    image?: string,
    date?: string,
}

const props = defineProps<Props>();

let resolvedDate: Date;
if (props.date) {
    resolvedDate = new Date(props.date);
}
</script>