<template>
    <div
        id="textcontainer"
        class="text-slate-200 break-words"
        v-html="markdown"
    ></div>
</template>
<script>
import { defineComponent } from "vue";
import { marked } from "marked";
import twemoji from "twemoji";
import * as emoji from "node-emoji";

// prettier-ignore
export default defineComponent({
    props: {
        attributes: Object,
        body: String,
    },
    computed: {
        markdown() {
            const markdown = marked(this.body, {
                headerIds: false, mangle: false, extensions: [
                    {
                        name: 'twemoji',
                        level: 'inline',
                        start(src) {
                            return src.indexOf(':');
                        },
                        tokenizer(src, _) {
                            const rule = /^:(\w+):/;
                            const match = rule.exec(src);
                            if (match) {
                                return {
                                    type: 'twemoji',
                                    raw: match[0],
                                    emoji: match[1],
                                };
                            }
                        },
                        renderer(token) {
                            return twemoji.parse(emoji.emojify(token.raw), {ext: `.svg`, size: 'svg'});
                        },
                    }
                ]
            });
            return markdown;
        },
    },
    mounted() {
        document.querySelectorAll("#textcontainer a").forEach((a) => {
            a.addEventListener("click", (e) => {
                const href = a.attributes.href.value;

                if (
                    !(href.startsWith("http://") || href.startsWith("https://"))
                ) {
                    e.preventDefault();
                    this.$router.push({ path: a.attributes.href.value });
                }
            });
        });
    },
});
</script>
