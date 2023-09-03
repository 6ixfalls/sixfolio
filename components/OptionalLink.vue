<template>
    <NuxtLink :href="href" v-if="!!href">
        <slot />
    </NuxtLink>
    <slot v-else />
</template>
<script setup lang="ts">
interface Props {
    href?: string,
}

const props = defineProps<Props>();
</script>