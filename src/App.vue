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

const range = 18;

const calcValue = (a, b) => ((a / b) * range - range / 2).toFixed(1);

export default defineComponent({
  data() {
    return {
      onIntro: true,
      hasProcessed: false,
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
        console.log(anim.direction);
        content.classList.remove("hidden");
      },
      targets: content,
      opacity: [0, 1],
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
      if (this.$data.hasProcessed) return;
      this.$data.hasProcessed = true;
      nextTick(() => {
        this.$data.hasProcessed = false;
      });

      const direction = Math.sign(delta);

      switch (direction) {
        case 1:
          this.$data.onIntro = false;
          this.$data.scrollAnimation.direction = "normal";
          this.$data.scrollAnimation.play();
          break;
        case -1:
          if (this.$data.onIntro) break;

          this.$data.onIntro = true;
          this.$router.push("/");
          this.$data.scrollAnimation.began =
            this.$data.scrollAnimation.completed = false;
          this.$data.scrollAnimation.loop =
            this.$data.scrollAnimation.progress = 0;
          this.$data.scrollAnimation.reverse();
          this.$data.scrollAnimation.play();
          break;
      }
    },
  },
});
</script>
