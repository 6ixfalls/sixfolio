<template>
  <div ref="root" @mousemove="mouseMove" @mousewheel="mouseWheel" class="h-screen w-screen max-w-full absolute">
    <div ref="topbar"
      class="fixed top-4 left-[50vw] -translate-x-1/2 bg-[rgba(255,255,255,0.1)] rounded backdrop-blur-sm border border-[rgba(255,255,255,0.1)] shadow-xl w-[85%] md:w-[40rem] h-12 z-10 flex items-center justify-between select-none">
      <NuxtLink class="m-4 font-medium text-white fixed no-underline" to="/">sixfalls</NuxtLink>
      <div class="m-auto flex flex-row h-full">
        <div v-for="page in pages" :key="page._path"
          class="group h-full transition-colors hover:bg-[rgba(255,255,255,0.1)] flex justify-center items-center">
          <NuxtLink :to="page._path"
            class="text-neutral-100 no-underline transition-colors group-hover:text-neutral-200 px-4 h-full flex items-center">
            {{
              page.title }}</NuxtLink>
        </div>
      </div>
      <div class="absolute right-2 flex flex-row">
        <a v-for="icon in icons" :key="icon.name" :href="icon.url" target="_blank"
          class="text-white no-underline transition-colors hover:text-neutral-300">
          <Icon :name="icon.name" class="icon-lg mx-2" />
        </a>
      </div>
    </div>
    <ClientOnly>
      <template #fallback>
        <div class="h-screen w-screen fixed z-50 bg-neutral-900 flex justify-center items-center">
          <Icon name="ant-design:loading-outlined" class="icon-xl z-[60] animate-spin" />
        </div>
      </template>
    </ClientOnly>
    <article ref="content" :class="isClient && 'hidden'">
      <NuxtPage
        class="mx-8 md:mx-12 lg:w-1/2 lg:mx-auto mt-24 pb-8 selection:bg-neutral-300 selection:text-neutral-700" />
    </article>
    <div ref="intro" class="fixed w-screen h-screen flex items-center justify-center text-white select-none"
      :class="onIntro || !scrollAnimation!.completed ? '' : 'hidden'" v-if="$route.path === '/'">
      <div ref="moon" class="absolute w-32 top-[10%] right-[10%]">
        <NuxtImg src="/img/mooncresc.png" class="animate-moon" alt="moon crescent" />
      </div>
      <div ref="starcontainer" class="fixed w-screen h-screen flex items-center justify-center">
        <div v-for="n in Math.floor(windowWidth / 10)" :key="n"
          class="absolute opacity-60 bg-white shadow shadow-white rounded" :class="{
            'animate-star1': n % 2 === 0,
            'animate-star2': n % 2 === 1,
            'w-0.5': n % 4 !== 3,
            'w-1': n % 4 === 3,
            'h-0.5': n % 4 !== 3,
            'h-1': n % 4 === 3,
          }" :style="{
  left: `${random() * 100}%`,
  top: `${random() * 100}%`,
  'animation-delay': `${random()}s`,
}" />
      </div>
      <div ref="container" class="flex flex-col w-2/3 h-1/3 perspective-[1800px]">
        <div ref="name" class="font-bold text-5xl rotate-y-45 translate-z-8">
          sixfalls
        </div>
        <span ref="desc" class="font-text text-3xl rotate-y-45 translate-z-5">Self-taught, game and software
          developer.</span>
      </div>
      <div ref="scroll"
        class="absolute bottom-12 supports-[top:100svh]:!bottom-auto animate-bounce drop-shadow-[0_1px_2px_rgb(150_150_150)]"
        style="top: calc(100svh - 3rem - 2em)">
        <Icon name="akar-icons:chevron-down" class="text-neutral-300 icon-2xl" />
      </div>
    </div>
    <div v-else>{{ onPageSwitch(1) }}</div>
  </div>
</template>
<script setup lang="ts">
import anime, { AnimeTimelineInstance } from "animejs";
import normalizeWheel from "normalize-wheel-es";
import seedrandom from "seedrandom";

const isClient = ref(!!process.client);

const { data: pages } = await useAsyncData('navigation', () => fetchContentNavigation());
const icons = {
  roblox: {
    name: "simple-icons:roblox",
    url: "https://www.roblox.com/users/193632792/profile",
  },
  discord: {
    name: "simple-icons:discord",
    url: "https://discord.com/users/303173495918034945",
  },
};

const random = ref(Object.freeze(seedrandom(undefined, { state: true })));
const randomState = random.value.state();

const intro = ref<HTMLDivElement>();
const content = ref<HTMLDivElement>();
const name = ref<HTMLDivElement>();
const desc = ref<HTMLDivElement>();
const container = ref<HTMLDivElement>();
const starcontainer = ref<HTMLDivElement>();
const moon = ref<HTMLDivElement>();
const scroll = ref<HTMLDivElement>();
const root = ref<HTMLDivElement>();
const topbar = ref<HTMLDivElement>();

const onIntro = ref(true);

let introAnimation: AnimeTimelineInstance | undefined;
let scrollAnimation: AnimeTimelineInstance | undefined;
let windowWidth = 0;
let hammer: HammerManager | undefined;

const range = 18;
const calcValue = (a: number, b: number) => (a / b) * range - range / 2;

function mouseMove({ x, y }: { x: number, y: number }) {
  const yValue = calcValue(y, window.innerHeight);
  const xValue = calcValue(x, window.innerWidth);

  if (container.value && starcontainer.value && moon.value && scroll.value) {
    container.value.style.transform = `translateX(${xValue}px) translateY(${yValue}px)`;
    starcontainer.value.style.transform = `translateX(${xValue * 0.3
      }px) translateY(${yValue * 0.3}px)`;
    moon.value.style.transform = `translateX(${xValue * 0.6}px) translateY(${yValue * 0.6
      }px)`;
    scroll.value.style.transform = `translateX(${xValue * 0.7
      }px) translateY(${yValue * 0.7}px)`;
  }
}

function mouseWheel(event: WheelEvent) {
  const { pixelY } = normalizeWheel(event);
  onPageSwitch(pixelY);
}

function onPageSwitch(delta: number) {
  const direction = Math.sign(delta);
  if (onIntro.value && direction === 1 && hammer && scrollAnimation) {
    onIntro.value = false;
    hammer?.get("swipe").set({ enable: false });
    scrollAnimation?.play();
  }
}

onMounted(() => {
  if (name.value)
    name.value.innerHTML = name.value?.innerHTML
      .split("")
      .map((char) => `<span>${char}</span>`)
      .join("");

  if (desc.value)
    desc.value.innerHTML = desc.value?.innerHTML.split(" ")
      .map((char) => `<span>${char}</span>`)
      .join(" ");

  if (isClient.value && moon.value && scroll.value && name.value && desc.value) {
    introAnimation = anime.timeline();
    introAnimation.add({
      targets: moon.value,
      translateY: [-500, 0],
      duration: 1400,
    });
    introAnimation.add({
      targets: name.value.querySelectorAll("span"),
      delay: anime.stagger(50),
      opacity: [0, 1],
      color: "#eee",
    });
    introAnimation.add({
      targets: desc.value.querySelectorAll("span"),
      delay: anime.stagger(200),
      opacity: [0, 1],
      color: "#ddd",
    });
    introAnimation.add({
      targets: scroll.value,
      opacity: [0, 1],
      duration: 1500,
    });
  }

  if (isClient.value && content.value && topbar.value && root.value) {
    content.value.classList.add("hidden");

    scrollAnimation = anime.timeline({ autoplay: false });
    scrollAnimation.add({
      complete: () => {
        if (intro.value)
          intro.value.classList.add("hidden");
      },
      targets: intro.value,
      top: -window.innerHeight,
      easing: "easeInOutQuad",
      duration: 1000,
    });
    scrollAnimation.add(
      {
        begin: () => {
          if (content.value)
            content.value.classList.remove("hidden");
        },
        targets: content.value,
        opacity: [0, 1],
        translateY: [100, 0],
        easing: "easeOutQuad",
        duration: 500,
      },
      "-=100"
    );
    scrollAnimation.add({
      targets: topbar.value,
      top: [-96, 16],
    });
    // @ts-ignore
    delete Hammer.defaults.cssProps.userSelect;
    hammer = new Hammer(root.value, { recognizers: [[Hammer.Swipe, { velocity: 0 }]] });
    hammer.on("swipe", (({ deltaY, pointerType }) => {
      if (pointerType !== "mouse") {
        onPageSwitch(-deltaY);
      }
    }));

    // catch if loaded post intro 
    if (!intro.value) {
      onPageSwitch(1);
    }
  }
});

onBeforeMount(() => {
  isClient.value = !!process.client;
  if (isClient.value) {
    windowWidth = window.innerWidth;
    window.addEventListener("resize", () => {
      windowWidth = window.innerWidth;
    });
  }
});

onBeforeUpdate(() => {
  random.value = Object.freeze(seedrandom(undefined, { state: randomState }));
});
</script>