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

# **Contributions**
      
Below are some games, projects, and things I've contributed to over the times.

<div id="md-card-container">
  <a href="https://www.roblox.com/games/7404980966" target="_blank"><md-card icon="simple-icons:roblox" cardtitle="Anime Tycoon 2" class-list="bg-red-600"><span>A Roblox tycoon game based on anime. UIs as well as weapons were created by me.</span></md-card></a>
  <a href="https://www.roblox.com/games/9983219695" target="_blank"><md-card icon="simple-icons:roblox" cardtitle="Club Magma" class-list="bg-red-600"><span>Created all UIs as well as scripting prior to the first release.</span></md-card></a>
  <a href="https://www.roblox.com/groups/4118194/the-1970s#!/about" target="_blank"><md-card icon="simple-icons:roblox" cardtitle="the 1970s" class-list="bg-red-600"><span>Contributed to new features to the games, as well as fixing numberous bugs.</span></md-card></a>
  <a href="https://www.roblox.com/groups/1131775/Tsunami-Sushi#!/about" target="_blank"><md-card icon="simple-icons:roblox" cardtitle="Tsunami Sushi" class-list="bg-red-600"><span>Bugfixes, more to come.</span></md-card></a>
  <a href="https://www.roblox.com/groups/2603983/Unique#!/about" target="_blank"><md-card icon="simple-icons:roblox" cardtitle="Unique°" class-list="bg-red-600"><span>Scripted the gamehub, as well as creating the primary framework for the homestore and photoshoot.</span></md-card></a>
  <a href="https://www.roblox.com/games/7952715986/Sleigh-Ride-to-Xmas-2" target="_blank"><md-card icon="simple-icons:roblox" cardtitle="Sleigh Ride to Xmas 2" class-list="bg-red-600"><span>Numerous fixes and changes, as well as adding new features to the game.</span></md-card></a>
  <a href="https://www.roblox.com/games/738548299/Fizze-Soda-Shop-Cafe-V2" target="_blank"><md-card icon="simple-icons:roblox" cardtitle="Fizze" class-list="bg-red-600"><span>Scripted around a third of the game, fixing features and adding new ones.</span></md-card></a>
  <a href="https://www.roblox.com/games/6497404911/Vibe-Spot" target="_blank"><md-card icon="simple-icons:roblox" cardtitle="Vibe Spot" class-list="bg-red-600"><span>Scripted as well as created UIs for the entire game.</span></md-card></a>
  <a href="https://www.roblox.com/groups/3909938/South-Pacific-Airways#!/about" target="_blank"><md-card icon="simple-icons:roblox" cardtitle="South Pacific Airways™" class-list="bg-red-600"><span>Worked as a long term developer for around a year in ~2020. Contributed to fixes and changes.</span></md-card></a>
  <a href="https://www.roblox.com/games/5905669674/Vibe-Tokyo" target="_blank"><md-card icon="simple-icons:roblox" cardtitle="Vibe Tokyo" class-list="bg-red-600"><span>Small changes, added elevator and other fixes.</span></md-card></a>
  <a href="https://www.roblox.com/groups/5206342/Delta-Air-Lines-DAL#!/about" target="_blank"><md-card icon="simple-icons:roblox" cardtitle="Delta Air Lines (roblox)" class-list="bg-red-600"><span>Bug fixes, etc, worked as a developer.</span></md-card></a>
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
