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
            class="w-full h-full perspective-96 rounded bg-neutral-800 bg-gradient-to-b from-neutral-800 to-neutral-900 bg-no-repeat shadow-xl overflow-hidden flex flex-row"
            style="background-position: center 20rem"
        >
            <div
                class="w-1/3 h-full flex justify-center items-center"
                :class="classList"
            >
                <Icon :icon="icon" class="icon-2xl" color="white"></Icon>
            </div>
            <div class="w-full p-4">
                <span class="text-lg font-semibold">{{ title }}</span>
                <br />
                <slot>empty</slot>
            </div>
        </div>
    </div>
</template>
<script>
import anime from "animejs";
import { Icon } from "@iconify/vue";

const map = (aval, a1, a2, b1, b2) =>
    ((aval - a1) / (a2 - a1)) * (b2 - b1) + b1;

const easeOutQuad = (x) =>
    x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;

const rotAngle = 15;

export default {
    name: "MarkdownCard",
    props: {
        title: String,
        description: String,
        icon: String,
        classList: String,
    },
    data: () => ({
        rotationalMultiplier: 0,
        x: 0,
        y: 0,
        id: null,
    }),
    methods: {
        mouseOver() {
            anime.remove(this.$refs.movement);
            anime({
                targets: this.$data,
                rotationalMultiplier: 1,
                duration: 150,
                easing: "easeInOutQuad",
            });
            this.$data.id = window.requestAnimationFrame(this.animationUpdated);
        },
        animationUpdated() {
            if (!this.$data.id) return;
            const { left, top, width, height } =
                this.$refs.wrapper.getBoundingClientRect();
            const xPos = this.$data.x - left;
            const yPos = this.$data.y - top;
            this.$refs.movement.style.transform = `rotateY(${
                map(easeOutQuad(xPos / width), 0, 1, -rotAngle, rotAngle) *
                this.$data.rotationalMultiplier
            }deg) rotateX(${
                map(easeOutQuad(yPos / height), 0, 1, rotAngle, -rotAngle) *
                this.$data.rotationalMultiplier
            }deg)`;
            this.$refs.movement.style.backgroundPosition = `center ${map(
                easeOutQuad(yPos / height) * this.$data.rotationalMultiplier,
                0,
                1,
                20,
                0
            )}rem`;
            this.$data.id = window.requestAnimationFrame(this.animationUpdated);
        },
        mouseMove({ x, y }) {
            this.$data.x = x;
            this.$data.y = y;
        },
        mouseLeave() {
            window.cancelAnimationFrame(this.$data.id);
            this.$data.id = null;
            anime.remove(this.$data);
            this.$data.rotationalMultiplier = 0;
            anime({
                targets: this.$refs.movement,
                rotateX: "0deg",
                rotateY: "0deg",
                backgroundPosition: "center 20rem",
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
