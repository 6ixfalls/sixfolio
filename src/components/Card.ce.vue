<template>
  <div
    ref="wrapper"
    @mousemove="mouseMove"
    @mouseover="mouseOver"
    @mouseleave="mouseLeave"
    class="w-full h-52 md:h-48 md:my-0 my-4"
  >
    <div
      ref="movement"
      class="
        w-full
        h-full
        perspective-96
        rounded
        bg-neutral-800
        shadow-xl
        overflow-hidden
        flex flex-row
      "
    >
      <div class="w-3/12 h-full flex justify-center items-center bg-blue-400">
        <Icon :icon="icon" class="icon-2xl"></Icon>
      </div>
      <div class="grow p-4">{{ description }}</div>
    </div>
  </div>
</template>
<script>
import anime from "animejs";
import { Icon } from "@iconify/vue";

const map = (aval, a1, a2, b1, b2) =>
  ((aval - a1) / (a2 - a1)) * (b2 - b1) + b1;

const rotAngle = 25;

export default {
  name: "MarkdownCard",
  props: {
    title: String,
    description: String,
    icon: String,
  },
  methods: {
    mouseOver() {
      anime.remove(this.$refs.movement);
    },
    mouseMove({ x, y }) {
      const { left, top, width, height } =
        this.$refs.wrapper.getBoundingClientRect();
      const xPos = x - left;
      const yPos = y - top;
      this.$refs.movement.style.transform = `rotateY(${map(
        xPos,
        0,
        width,
        -rotAngle,
        rotAngle
      )}deg) rotateX(${map(yPos, 0, height, rotAngle, -rotAngle)}deg)`;
    },
    mouseLeave() {
      anime({
        targets: this.$refs.movement,
        rotateX: "0deg",
        rotateY: "0deg",
        duration: 250,
        easing: "easeInOutQuad",
      });
    },
  },
  components: {
    Icon,
  },
};
</script>