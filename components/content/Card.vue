<template>
    <OptionalLink :href="href">
        <CardWrapper :transitionSpeed="500" :tiltMaxAngleX="16" :tiltMaxAngleY="16" :scale="1.07" :tiltReverse="true"
            :glareEnable="true" glareBorderRadius="0.25rem" :glareMaxOpacity="0.17">
            <div ref="wrapper" class="w-full h-52 md:h-48 md:my-0 my-4">
                <div ref="movement" id="movement"
                    class="w-full h-full rounded bg-neutral-800 shadow-xl overflow-hidden flex flex-row">
                    <div class="w-1/3 h-full flex justify-center items-center" :class="classList">
                        <Icon :name="icon!" class="icon-2xl" color="white"></Icon>
                    </div>
                    <div class="w-full p-4">
                        <div class="text-lg font-semibold mb-0.5">{{ cardTitle }}</div>
                        <ContentSlot />
                    </div>
                </div>
            </div>
        </CardWrapper>
    </OptionalLink>
</template>
<script setup lang="ts">
interface Props {
    cardTitle: string,
    icon: string,
    classList: string,
    href?: string,
}

const props = withDefaults(defineProps<Props>(), {
    cardTitle: "Card Title",
    icon: "akar-icons:circle",
    classList: "",
});
</script>