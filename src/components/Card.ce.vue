<template>
  <div
    ref="wrapper"
    @mousemove="mouseMove"
    @mouseover="mouseOver"
    @mouseleave="mouseLeave"
    class="w-full h-52 lg:h-48 lg:my-0 my-4"
  >
    <div
      ref="movement"
      class="w-full h-full perspective-96 rounded bg-neutral-800 shadow-xl p-3"
    >
      test
    </div>
  </div>
</template>
<script>
import anime from "animejs";

const map = (aval, a1, a2, b1, b2) =>
  ((aval - a1) / (a2 - a1)) * (b2 - b1) + b1;

const rotAngle = 25;

export default {
  name: "MarkdownCard",
  methods: {
    mouseOver() {
      anime.remove(this.$refs.movement);
    },
    mouseMove({ x, y, target }) {
      const { left, top, width, height } = target.getBoundingClientRect();
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
};
</script>