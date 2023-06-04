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
            id="movement"
            class="w-full h-full perspective-96 rounded bg-neutral-800 shadow-xl overflow-hidden flex flex-row"
            style="--vert-gradient-pos: 20rem"
        >
            <div
                class="w-1/3 h-full flex justify-center items-center"
                :class="classList"
            >
                <Icon :icon="icon" class="icon-2xl" color="white"></Icon>
            </div>
            <div class="w-full p-4">
                <span class="text-lg font-semibold">{{ cardTitle }}</span>
                <br />
                <slot>empty</slot>
            </div>
        </div>
    </div>
</template>
<style scoped>
#movement:after {
    content: "";
    position: fixed;
    background-repeat: no-repeat;
    mask-repeat: no-repeat;
    background-color: #262626;
    background-image: linear-gradient(to bottom, rgba(38, 38, 38, 0), #171717);
    mask-image: linear-gradient(to bottom, rgba(38, 38, 38, 0), #171717);
    width: 100%;
    height: 100%;
    background-position: center var(--vert-gradient-pos);
    mask-position: center var(--vert-gradient-pos);
    pointer-events: none;
}
</style>
<script>
import anime from "animejs";
import { Icon } from "@iconify/vue";

const map = (aval, a1, a2, b1, b2) =>
    ((aval - a1) / (a2 - a1)) * (b2 - b1) + b1;

const easeOutQuad = (x) =>
    x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;

const getCssVarProxy = (targetElement, ...varNames) => {
    // Declare object to proxy
    let proxyTarget = {};

    // Capture initial values
    varNames.forEach(
        (varName) =>
            (proxyTarget[varName] =
                getComputedStyle(targetElement).getPropertyValue(varName))
    );

    // Create proxy to update element's CSS vars
    return new Proxy(proxyTarget, {
        set: (targetObject, property, value) => {
            targetElement.style.setProperty(property, value);
            return true;
        },
    });
};

const rotAngle = 15;

export default {
    name: "MarkdownCard",
    props: {
        cardTitle: String,
        description: String,
        icon: String,
        classList: String,
    },
    data: () => ({
        rotationalMultiplier: 0,
        x: 0,
        y: 0,
        id: null,
        movementProxy: null,
    }),
    mounted() {
        this.$data.movementProxy = getCssVarProxy(
            this.$refs.movement,
            "--vert-gradient-pos"
        );
    },
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
            this.$refs.movement.style.setProperty(
                "--vert-gradient-pos",
                `${map(
                    easeOutQuad(yPos / height) *
                        this.$data.rotationalMultiplier,
                    0,
                    1,
                    15,
                    4
                )}rem`
            );
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
                targets: [this.$refs.movement, this.$data.movementProxy],
                rotateX: "0deg",
                rotateY: "0deg",
                "--vert-gradient-pos": "20rem",
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
