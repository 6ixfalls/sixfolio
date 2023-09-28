<template>
    <ClientOnly fallbackTag="div">
        <Tilt v-bind="$attrs">
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