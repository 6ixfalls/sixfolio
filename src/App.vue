<template>
  <router-view class="hidden" />
  <div
    id="intro"
    class="
      fixed
      w-screen
      h-screen
      flex
      items-center
      text-white
      font-bold
      text-5xl
    "
  >
    <div id="name" class="">sixfalls</div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import anime from "animejs";
import Letterize from "letterizejs";

export default defineComponent({
  mounted: () => {
    const introName = new Letterize({
      targets: "#intro #name",
    });

    const animation = anime.timeline({
      targets: introName.listAll,
      delay: anime.stagger(150),
    });

    animation.add({
      opacity: [0, 1],
    });
  },
});
</script>
