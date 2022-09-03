<template>
  <div class="w-full h-full rounded bg-neutral-700"></div>
</template>
<style scoped>
/* add tailwind to shadow root for styling */
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
<script>
export default {
  name: "MarkdownCard",
  styles: ["display: block; width: 50vw; height: 10vh;"],
};
</script>