<template>
  <div
    ref="root"
    @mousemove="mouseMove"
    @mousewheel="mouseWheel"
    class="w-screen h-screen"
  >
    <div ref="content" class="hidden"><router-view /></div>
    <div
      ref="intro"
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
      <div ref="moon" class="absolute w-32 top-[10%] right-[10%]">
        <img src="/img/mooncresc.png" class="opacity-60 animate-moon" />
      </div>
      <div
        ref="starcontainer"
        class="fixed w-screen h-screen flex items-center justify-center"
      >
        <div
          v-for="n in Math.floor(windowWidth / 10)"
          :key="n"
          class="absolute opacity-60 bg-white shadow shadow-white rounded"
          :class="{
            'animate-star1': n % 2 === 0,
            'animate-star2': n % 2 === 1,
            'w-0.5': n % 4 !== 3,
            'w-1': n % 4 === 3,
            'h-0.5': n % 4 !== 3,
            'h-1': n % 4 === 3,
          }"
          :style="{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            'animation-delay': `${Math.random()}s`,
          }"
        />
      </div>

      <div
        ref="container"
        class="flex flex-col w-2/3 h-1/3 perspective-[1800px]"
      >
        <div ref="name" class="font-bold text-5xl rotate-y-45 translate-z-8">
          sixfalls
        </div>
        <span ref="desc" class="font-text text-3xl rotate-y-45 translate-z-5"
          >Self-taught, game and software developer.</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, nextTick } from "vue";
import anime from "animejs";
import normalizeWheel from "normalize-wheel";
import Hammer from "hammerjs";
import { Icon } from "@iconify/vue";

const range = 18;

const calcValue = (a, b) => ((a / b) * range - range / 2).toFixed(1);

export default defineComponent({
  data() {
    return {
      onIntro: true,
      windowWidth: window.innerWidth,
    };
  },
  mounted() {
    const intro = this.$refs.intro;
    const content = this.$refs.content;
    const introName = this.$refs.name;
    introName.innerHTML = introName.innerHTML
      .split("")
      .map((char) => `<span>${char}</span>`)
      .join("");

    const introDesc = this.$refs.desc;
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

    const scrollAnimation = anime.timeline({ autoplay: false });

    scrollAnimation.add({
      targets: intro,
      translateY: -window.innerHeight,
      easing: "easeInOutQuad",
      duration: 1000,
    });
    console.log(content);
    scrollAnimation.add({
      begin: (anim) => {
        intro.classList.add("hidden");
        content.classList.remove("hidden");
      },
      targets: content,
      opacity: [0, 1],
      translateY: [100, 0],
      easing: "easeInOutQuad",
      duration: 500,
    });

    this.$data.scrollAnimation = scrollAnimation;

    //delete Hammer.defaults.cssProps.userSelect;
    const hammer = new Hammer(this.$refs.root, {
      recognizers: [[Hammer.Swipe, { velocity: 0, distance: 20 }]],
    });

    hammer.on("swipe", this.pageScroll);
  },
  methods: {
    mouseMove({ x, y }) {
      const yValue = calcValue(y, window.innerHeight);
      const xValue = calcValue(x, window.innerWidth);

      const container = this.$refs.container;
      container.style.transform = `translateX(${xValue}px) translateY(${yValue}px)`;
      const container2 = this.$refs.starcontainer;
      container2.style.transform = `translateX(${xValue * 0.3}px) translateY(${
        yValue * 0.3
      }px)`;
      const moon = this.$refs.moon;
      moon.style.transform = `translateX(${xValue * 0.8}px) translateY(${
        yValue * 0.8
      }px)`;
    },
    mouseWheel(event) {
      const { pixelY } = normalizeWheel(event);
      this.onPageSwitch(pixelY);
    },
    pageScroll({ deltaY, pointerType }) {
      if (pointerType !== "mouse") {
        this.onPageSwitch(-deltaY);
      }
    },
    onPageSwitch(delta) {
      const direction = Math.sign(delta);

      if (this.$data.onIntro && direction === 1) {
        this.$data.onIntro = false;
        this.$data.scrollAnimation.play();
      }
    },
  },
  components: {
    Icon,
  },
});
</script>
