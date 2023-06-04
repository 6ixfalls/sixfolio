<template>
    <div
        id="textcontainer"
        class="text-slate-200 break-words"
        v-html="markdown"
    ></div>
</template>
<script>
import { defineComponent } from "vue";
import markdownIt from "markdown-it";
import markdownItEmoji from "markdown-it-emoji";
import markdownItAbbr from "markdown-it-abbr";
import markdownItContainer from "markdown-it-container";
import twemoji from "twemoji";
import hljs from "highlight.js";

const markdown = markdownIt({
    html: false,
    xhtmlOut: false,
    breaks: true,
    langPrefix: "language-",
    linkify: true,
    typographer: true,
    quotes: "“”‘’",
    highlight: function (string, language) {
        if (language && hljs.getLanguage(language)) {
            try {
                return (
                    '<pre class="hljs"><code>' +
                    hljs.highlight(string, { language, ignoreIllegals: true })
                        .value +
                    "</code></pre>"
                );
            } catch (__) {}
        }

        return (
            '<pre class="hljs"><code>' +
            markdown.utils.escapeHtml(string) +
            "</code></pre>"
        );
    },
});

// emoji
markdown.use(markdownItEmoji);
markdown.renderer.rules.emoji = function (token, idx) {
    return twemoji.parse(token[idx].content);
};
// abbr
markdown.use(markdownItAbbr);
// cards based off of Card.ce.vue
markdown.use(markdownItContainer, "card", {
    validate: function (params) {
        return params.trim().match(/^card\s+(.*)$/);
    },
    render: function (tokens, idx) {
        let token = tokens[idx];

        // check if closing tag
        if (tokens[idx].nesting === -1) {
            // search for the opening tag
            token = tokens
                .slice(0, idx)
                .reverse()
                .find(
                    (token) =>
                        token.type === "container_card_open" &&
                        token.nesting === 1 &&
                        token.level === tokens[idx].level
                );
        }

        const m = token.info.trim().match(/^card\s+(.*)$/);

        // parse attributes from the card tag
        const attributes = {};
        const attributeRegex = /([^\s=]+)=["']([^"']*)["']/g;
        let match;
        while ((match = attributeRegex.exec(m[1])) !== null) {
            attributes[match[1]] = match[2];
        }

        const href = attributes.href;
        delete attributes.href;

        if (tokens[idx].nesting === 1) {
            // opening tag
            return `${href ? `<a href=${href}>` : ""}<md-card ${Object.keys(
                attributes
            )
                .map((key) => `${key}="${attributes[key]}"`)
                .join(" ")}><span>`;
        } else {
            return `</span></md-card>${href ? "</a>" : ""}\n`;
        }
    },
});
// markdown containers (no params)
markdown.use(markdownItContainer, "container", {
    render: function (tokens, idx) {
        if (tokens[idx].nesting === 1) {
            // opening tag
            return `<div id="md-card-container">`;
        } else {
            // closing tag
            return "</div>\n";
        }
    },
});

// prettier-ignore
export default defineComponent({
    props: {
        attributes: Object,
        body: String,
    },
    computed: {
        markdown() {
            let rendered = markdown.render(this.body);
            // add target="_blank" to all links
            const parser = new DOMParser();
            const doc = parser.parseFromString(rendered, "text/html");
            doc.querySelectorAll("a").forEach((a) => {
                a.setAttribute("target", "_blank");
            });
            // convert blockquotes to divs with blockquote class in reverse
            const quotes = doc.querySelectorAll("blockquote");
            for (let i = quotes.length; i--;) {
                const blockquote = quotes[i];
                const div = document.createElement("div");
                div.classList.add("blockquote");
                div.innerHTML = blockquote.innerHTML;
                blockquote.replaceWith(div);
                const breakEl = document.createElement("break");
                div.before(breakEl);
            }

            rendered = doc.body.innerHTML;
            return rendered;
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
