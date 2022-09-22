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

// prettier-ignore
export default defineComponent({
    computed: {
        markdown() {
            const markdown = marked(`
# **Who am I**
        
I'm Bryan, a full-stack and game developer with 4+ years of expertise in Luau and JavaScript. I create games, websites, and software.
 I also work on commissions and part-time work. I've worked with several Roblox development studios as well as developing websites and bots. 
 I'm also enthusiastic about creating user interfaces that are fluid, clear, and simple to use and understand. 
 I'm also interested in creating games that are enjoyable to play and provide a one-of-a-kind experience.

# **Technology**
<div id="md-card-container">
    <md-card icon="simple-icons:lua" title="Luau" class-list="bg-blue-500"><span>4+ years of experience with Lua and Luau on Roblox. Published multiple games on Roblox; primary game platform currently.</span></md-card>
    <md-card icon="simple-icons:typescript" title="TypeScript" class-list="bg-blue-500"><span>2+ years of experience, primarily focused on Discord Bots and a few programs. Most used language outside of Lua.</span></md-card>
    <md-card icon="simple-icons:javascript" title="JavaScript" class-list="bg-yellow-600"><span>3+ years of experience; although I mostly use TypeScript. Primarily used for websites, rarely for Discord Bots.</span></md-card>
    <md-card icon="simple-icons:java" title="Java" class-list="bg-red-700"><span>2+ years of experience, primarily used for Minecraft development, including plugins and mods, primarily in Java 8.</span></md-card>
    <md-card icon="simple-icons:vuedotjs" title="VUE.JS" class-list="bg-green-600"><span>~6 months of experience, used alongside Vite and Tailwind for website design, such as my portfolio.</span></md-card>
    <md-card icon="simple-icons:linux" title="Linux" class-list="bg-blue-900"><span>2+ years of personal sysadmin experience, managing my own servers and creating software for personal hosting use.</span></md-card>
</div>
`);
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
