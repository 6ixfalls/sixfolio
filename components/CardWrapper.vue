<template>
    <ClientOnly fallbackTag="div">
        <Tilt :transitionSpeed="500" :tiltMaxAngleX="16" :tiltMaxAngleY="16" :scale="1.07" :tiltReverse="true"
            :glareEnable="true" glareBorderRadius="0.25rem" :glareMaxOpacity="0.17">
            <slot />
        </Tilt>
        <template #fallback>
            <slot />
        </template>
    </ClientOnly>
</template>
<script setup lang="ts">
import ReactTilt from "react-parallax-tilt";
const Tilt = applyReactInVue(ReactTilt);
</script>