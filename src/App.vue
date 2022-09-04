<template>
  <div
    ref="root"
    @mousemove="mouseMove"
    @mousewheel="mouseWheel"
    class="h-screen w-screen max-w-full absolute"
  >
    <div
      ref="topbar"
      class="
        fixed
        top-4
        left-1/2
        -translate-x-1/2
        bg-[rgba(255,255,255,0.1)]
        rounded
        backdrop-blur-sm
        border border-[rgba(255,255,255,0.1)]
        shadow-xl
        w-[85%]
        md:w-[40rem]
        h-12
        z-10
        flex
        items-center
        justify-between
        select-none
      "
    >
      <router-link class="m-4 font-medium text-white fixed no-underline" to="/"
        >sixfalls</router-link
      >
      <div class="m-auto flex flex-row h-full">
        <div
          v-for="route in routes"
          :key="route.path"
          class="
            group
            px-4
            h-full
            transition-colors
            hover:bg-[rgba(255,255,255,0.1)]
            flex
            justify-center
            items-center
          "
        >
          <router-link
            :to="route.path"
            class="
              text-neutral-100
              no-underline
              transition-colors
              group-hover:text-neutral-200
            "
            >{{ route.meta.friendly }}</router-link
          >
        </div>
      </div>
      <div class="absolute right-2 flex flex-row">
        <a
          v-for="icon in icons"
          :key="icon.name"
          :href="icon.url"
          class="
            text-white
            no-underline
            transition-colors
            hover:text-neutral-300
          "
        >
          <Icon :icon="icon.name" class="icon-lg mx-2" />
        </a>
      </div>
    </div>
    <div ref="content" class="hidden">
      <router-view
        class="
          m-8
          mt-24
          pb-8
          selection:bg-neutral-300 selection:text-neutral-700
        "
      />
    </div>
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
        select-none
      "
      v-if="this.$route.path === '/'"
    >
      <div ref="moon" class="absolute w-32 top-[10%] right-[10%]">
        <img src="/img/mooncresc.png" class="animate-moon" />
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

      <!--<div
        ref="scroll"
        class="
          absolute
          w-5
          h-8
          rounded-full
          border-neutral-400 border-2
          bottom-12
          flex
          items-center
          justify-center
        "
      >
        <div
          class="
            absolute
            w-1
            h-2
            rounded-full
            bg-neutral-400
            top-0
            animate-scrollwheel
          "
        />
      </div>-->
      <div
        ref="scroll"
        class="
          absolute
          bottom-12
          animate-bounce
          drop-shadow-[0_1px_2px_rgb(150_150_150)]
        "
      >
        <Icon
          icon="akar-icons:chevron-down"
          class="text-neutral-300 icon-2xl"
        />
      </div>
    </div>
    <div v-else>{{ onPageSwitch(1) }}</div>
  </div>
</template>

<script>
import { defineComponent, nextTick } from "vue";
import { defineCustomElement } from "./apiCustomElement";
import anime from "animejs";
import normalizeWheel from "normalize-wheel";
import Hammer from "hammerjs";
import { Icon } from "@iconify/vue";
import Card from "./components/Card.ce.vue";

const range = 18;

const calcValue = (a, b) => ((a / b) * range - range / 2).toFixed(1);

export default defineComponent({
  computed: {
    routes() {
      return this.$router.getRoutes().filter((i) => i.meta.friendly);
    },
  },
  data() {
    return {
      onIntro: true,
      windowWidth: window.innerWidth,
      icons: {
        roblox: {
          name: "simple-icons:roblox",
          url: "https://www.roblox.com/users/193632792/profile",
        },
        discord: {
          name: "simple-icons:discord",
          url: "https://discord.com/users/303173495918034945",
        },
      },
    };
  },
  mounted() {
    delete Hammer.defaults.cssProps.userSelect;

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
      targets: this.$refs.moon,
      translateY: [-500, 0],
      duration: 1400,
    });
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
    introAnimation.add({
      targets: this.$refs.scroll,
      opacity: [0, 1],
      duration: 1500,
    });

    const scrollAnimation = anime.timeline({ autoplay: false });

    scrollAnimation.add({
      complete: () => {
        intro.classList.add("hidden");
      },
      targets: intro,
      top: -window.innerHeight,
      easing: "easeInOutQuad",
      duration: 1000,
    });
    scrollAnimation.add(
      {
        begin: () => {
          content.classList.remove("hidden");
        },
        targets: content,
        opacity: [0, 1],
        translateY: [100, 0],
        easing: "easeOutQuad",
        duration: 500,
      },
      "-=100"
    );
    scrollAnimation.add({
      targets: this.$refs.topbar,
      top: [-96, 16],
    });

    this.$data.scrollAnimation = scrollAnimation;

    //delete Hammer.defaults.cssProps.userSelect;
    this.$data.hammer = new Hammer(this.$refs.root, {
      recognizers: [[Hammer.Swipe, { velocity: 0, distance: 20 }]],
    });

    this.$data.hammer.on("swipe", this.pageScroll);

    customElements.define(
      "md-card",
      defineCustomElement(Card, { shadowRoot: false })
    ); // define markdown card component
  },
  methods: {
    mouseMove({ x, y }) {
      const yValue = calcValue(y, window.innerHeight);
      const xValue = calcValue(x, window.innerWidth);

      const container = this.$refs.container;
      const container2 = this.$refs.starcontainer;
      const moon = this.$refs.moon;
      const scroll = this.$refs.scroll;

      if (!container) return;

      container.style.transform = `translateX(${xValue}px) translateY(${yValue}px)`;
      container2.style.transform = `translateX(${xValue * 0.3}px) translateY(${
        yValue * 0.3
      }px)`;
      moon.style.transform = `translateX(${xValue * 0.6}px) translateY(${
        yValue * 0.6
      }px)`;
      scroll.style.transform = `translateX(${xValue * 0.7}px) translateY(${
        yValue * 0.7
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
        this.$data.hammer.get("swipe").set({ enable: false });
        this.$data.scrollAnimation.play();
      }
    },
  },
  components: {
    Icon,
  },
});
</script>
