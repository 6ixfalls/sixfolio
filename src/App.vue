<template>
  <div ref="root" @mousemove="mouseMove" @mousewheel="mouseWheel">
    <router-view class="hidden" />
    <div
      id="intro"
      class="
        fixed
        w-screen
        h-screen
        flex
        items-center
        justify-center
        text-white
      "
    >
      <div
        id="container"
        class="flex flex-col w-2/3 h-1/3 perspective-[1800px]"
      >
        <div id="name" class="font-bold text-5xl rotate-y-45 translate-z-8">
          sixfalls
        </div>
        <span id="desc" class="font-text text-3xl rotate-y-45 translate-z-5"
          >Self-taught, game and software developer.</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import anime from "animejs";
import normalizeWheel from "normalize-wheel";

const range = 18;

const calcValue = (a, b) => ((a / b) * range - range / 2).toFixed(1);

export default defineComponent({
  mounted: function () {
    const introName = this.$refs.root.querySelector("#intro #name");
    introName.innerHTML = introName.innerHTML
      .split("")
      .map((char) => `<span>${char}</span>`)
      .join("");

    const introDesc = this.$refs.root.querySelector("#intro #desc");
    introDesc.innerHTML = introDesc.innerHTML
      .split(" ")
      .map((char) => `<span>${char}</span>`)
      .join(" ");

    const introAnimation = anime.timeline();

    introAnimation.add({
      targets: introName.querySelectorAll("span"),
      delay: anime.stagger(50),
      opacity: [0, 1],
      color: "#eee",
    });
    introAnimation.add({
      targets: introDesc.querySelectorAll("span"),
      delay: anime.stagger(200),
      opacity: [0, 1],
      color: "#ddd",
    });
  },
  methods: {
    mouseMove: function ({ x, y }) {
      const yValue = calcValue(y, window.innerHeight);
      const xValue = calcValue(x, window.innerWidth);

      const container = this.$refs.root.querySelector("#container");
      container.style.transform = `translateX(${xValue}px) translateY(${yValue}px)`;
    },
    mouseWheel: function (event) {
      const { pixelY } = normalizeWheel(event);
      console.log(pixelY);
    },
  },
});
</script>
