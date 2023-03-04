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
# **Completed Projects**
      
There are infinite possibilities for what people can do. Here are some of my projects that I've completed. Many of my projects have been either done in private, or through commissions, which can be provided on <a class="no-underline" href="/">request</a>.

<div id="md-card-container">
  <a href="https://www.roblox.com/games/11731663131" target="_blank"><md-card icon="simple-icons:roblox" cardtitle="Pet Tower Tycoon" class-list="bg-red-600"><span>A Roblox tycoon game where you can build a tower, merge pets, and evolve them into higher ones. Fully scripted by myself in ~2 weeks.</span></md-card></a>
  <a href="https://about.sixfalls.me/" target="_blank"><md-card icon="simple-icons:html5" cardtitle="QuickAbout" class-list="bg-orange-500"><span>A simple about page based off of the Comfy BetterDiscord theme. Uses lanyard to show the user's discord status and information.</span></md-card></a>
  <a href="https://github.com/6ixfalls/RPresence" target="_blank"><md-card icon="simple-icons:typescript" cardtitle="RPresence" class-list="bg-blue-500"><span>Custom implementation of a discord status/presence for Roblox, which utilizes electron and windows APIs to listen to processes.</span></md-card></a>
  <a href="https://github.com/6ixfalls/6ixfalls" target="_blank"><md-card icon="simple-icons:javascript" cardtitle="Github README" class-list="bg-yellow-600"><span>A custom Github README file, with dynamically updating repository data through Github Actions and the Github API.</span></md-card></a>
  <a href="https://www.roblox.com/games/10058186232/Bahas-Globe-Challenge" target="_blank"><md-card icon="simple-icons:roblox" cardtitle="Baha's Globe Challenge" class-list="bg-red-600"><span>A challange to, based off of data of cities, populate a 3D model with cities that you can explore. Completed in < 1 hour.</span></md-card></a>
  <a href="https://github.com/6ixfalls/sixshx" target="_blank"><md-card icon="simple-icons:typescript" cardtitle="Custom CDN" class-list="bg-blue-500"><span>A custom implementation of a CDN supporting ShareX storing files through S3.</span></md-card></a>
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
