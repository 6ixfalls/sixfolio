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
        
Hey there! I'm Bryan, a full-stack and game developer with 4+ years of expertise in Luau and JavaScript. I create games, websites, and software.
 I also work on commissions and part-time work. I've worked with several Roblox development studios as well as developing websites and bots. 
 I'm also enthusiastic about creating user interfaces that are fluid, clear, and simple to use and understand, as well as creating games that are enjoyable to play and provide a one-of-a-kind experience.

# **Technology**
<div id="md-card-container">
    <md-card icon="simple-icons:lua" cardtitle="Luau" class-list="bg-blue-500"><span>5+ years of experience with Lua and Luau on Roblox. Published multiple games on Roblox; primary game platform currently.</span></md-card>
    <md-card icon="simple-icons:typescript" cardtitle="TypeScript" class-list="bg-blue-500"><span>3+ years of experience, primarily focused on Discord Bots and a few programs. Most used language outside of Lua.</span></md-card>
    <md-card icon="simple-icons:javascript" cardtitle="JavaScript" class-list="bg-yellow-600"><span>4+ years of experience; although I mostly use TypeScript. Primarily used for websites, rarely for Discord Bots.</span></md-card>
    <md-card icon="simple-icons:java" cardtitle="Java" class-list="bg-red-700"><span>2+ years of experience, primarily used for Minecraft development, including plugins and mods, primarily in Java 8.</span></md-card>
    <md-card icon="simple-icons:vuedotjs" cardtitle="VUE.JS" class-list="bg-green-600"><span>~1 year of experience, used alongside Vite and Tailwind for website design, such as my portfolio.</span></md-card>
    <md-card icon="simple-icons:linux" cardtitle="Linux" class-list="bg-blue-900"><span>3+ years of personal sysadmin experience, managing my own servers and creating software for personal hosting use.</span></md-card>
</div>

# **Contact**
You can find me on the following platforms. I'm most active on Discord, but I'm also active on Twitter and Github.

Discord: <a href="https://discord.com/users/303173495918034945" class="no-underline">sixfalls#0001</a>

Twitter: <a href="https://twitter.com/6ixfalls" class="no-underline">6ixfalls</a>

Github: <a href="https://github.com/6ixfalls" class="no-underline">6ixfalls</a>

I look forward to working with you!
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
