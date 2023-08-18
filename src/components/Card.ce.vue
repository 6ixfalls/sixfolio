<template>
    <Tilt
        :transitionSpeed="500"
        :tiltMaxAngleX="16"
        :tiltMaxAngleY="16"
        :scale="1.07"
        :tiltReverse="true"
        :glareEnable="true"
        glareBorderRadius="0.25rem"
        :glareMaxOpacity="0.17"
    >
        <div ref="wrapper" class="w-full h-52 md:h-48 md:my-0 my-4">
            <div
                ref="movement"
                id="movement"
                class="w-full h-full rounded bg-neutral-800 shadow-xl overflow-hidden flex flex-row"
            >
                <div
                    class="w-1/3 h-full flex justify-center items-center"
                    :class="classList"
                >
                    <Icon :icon="icon" class="icon-2xl" color="white"></Icon>
                </div>
                <div class="w-full p-4">
                    <span class="text-lg font-semibold">{{ cardTitle }}</span>
                    <br />
                    <slot>empty</slot>
                </div>
            </div>
        </div>
    </Tilt>
</template>
<script lang="ts">
import { applyReactInVue } from "veaury";
import Tilt from "react-parallax-tilt";
import { Icon } from "@iconify/vue";

export default {
    name: "MarkdownCard",
    props: {
        cardTitle: String,
        description: String,
        icon: String,
        classList: String,
    },
    components: {
        Icon,
        Tilt: applyReactInVue(Tilt),
    },
};
</script>
