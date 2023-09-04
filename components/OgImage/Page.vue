<script setup lang="ts">
// inherited attrs can mess up the satori parser
defineOptions({
    inheritAttrs: false,
})

const props = defineProps({
    title: String,
    description: String,
})
</script>

<template>
    <div class="w-full h-full bg-neutral-900 flex flex-col" :style="{
        backgroundColor: '#141414',
        backgroundImage: `url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PSc0MCcgdmlld0JveD0nMCAwIDQwIDQwJz48ZyBmaWxsLXJ1bGU9J2V2ZW5vZGQnPjxnIGZpbGw9JyMxOTE5MTknIGZpbGwtb3BhY2l0eT0nMSc+PHBhdGggZD0nTTAgMzguNTlsMi44My0yLjgzIDEuNDEgMS40MUwxLjQxIDQwSDB2LTEuNDF6TTAgMS40bDIuODMgMi44MyAxLjQxLTEuNDFMMS40MSAwSDB2MS40MXpNMzguNTkgNDBsLTIuODMtMi44MyAxLjQxLTEuNDFMNDAgMzguNTlWNDBoLTEuNDF6TTQwIDEuNDFsLTIuODMgMi44My0xLjQxLTEuNDFMMzguNTkgMEg0MHYxLjQxek0yMCAxOC42bDIuODMtMi44MyAxLjQxIDEuNDFMMjEuNDEgMjBsMi44MyAyLjgzLTEuNDEgMS40MUwyMCAyMS40MWwtMi44MyAyLjgzLTEuNDEtMS40MUwxOC41OSAyMGwtMi44My0yLjgzIDEuNDEtMS40MUwyMCAxOC41OXonLz48L2c+PC9nPjwvc3ZnPg==)`,
    }">
        <div class="flex m-12 my-8">
            <div class="flex flex-col">
                <span class="font-bold text-6xl text-white">
                    {{ props.title }}
                </span>
                <span class="font-normal text-3xl text-slate-300 mb-6">
                    {{ props.description }}
                </span>
            </div>
        </div>
        <svg class="absolute top-0 left-0" viewbox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(152, -296) scale(6)">
                <path
                    style="opacity:1;fill:#1d1d1d;stroke:none;stroke-width:0.264583px;stroke-linecap:butt;stroke-linejoin:miter;"
                    d="m 133.71901,83.753121 c -8.11755,-0.02462 -16.35531,3.043041 -22.29476,10.161135 -12.670831,15.185314 -7.44492,26.080914 -8.92401,28.546054 -1.47908,2.46514 -8.824934,15.53018 -19.819465,15.92461 -10.994517,0.39442 -8.701119,3.24342 -6.086448,5.0214 2.614678,1.77798 8.78541,2.64997 10.005589,2.64997 1.220182,0 5.71713,0.27878 9.30796,-2.09186 3.590819,-2.37064 7.251234,-5.50819 7.251234,-5.50819 0,0 8.61047,54.95082 61.06863,59.8811 0,0 17.40389,1.62695 27.75748,-8.23361 10.35359,-9.86056 5.52164,-16.46702 3.94394,-25.2429 -0.2194,-0.66689 -0.83427,-0.66077 -1.01234,0.12557 0.81239,16.43099 -7.19126,19.58665 -17.59789,19.1239 -16.32806,-2.35715 -19.44113,-10.35271 -20.8902,-12.77907 -1.49908,-2.51009 -3.06786,-5.64783 -3.24218,-10.98176 -0.12511,-4.55938 0.0389,-8.16617 2.02158,-12.14861 8.54122,9.0402 24.79748,8.25392 23.24768,2.55798 -0.63926,-2.34944 -9.28061,-3.53393 -12.20597,-8.91108 -1.86682,-3.70947 -3.31368,-8.1362 -3.25148,-12.70775 0.0772,-5.67341 2.21132,-7.5398 2.12132,-13.38368 -0.0957,-6.21714 -2.56561,-16.384086 -7.78454,-21.401273 -5.37098,-6.574814 -14.41624,-10.574036 -23.61613,-10.601936 z m -6.59133,20.593049 c -0.81663,2.42355 0.0342,1.42892 0.0801,2.68098 0,0 -6.55917,1.21934 -13.86065,4.33255 -2.66863,-4.35631 11.22908,-6.77996 13.78055,-7.01353 z m 12.84831,1.94924 h 5.2e-4 c 2.55147,0.23357 15.90296,4.58268 13.23433,8.93899 -6.18589,-4.08935 -13.31443,-6.25802 -13.31443,-6.25802 0.0459,-1.25206 0.89621,-0.25742 0.0796,-2.68097 z m -9.53378,8.65012 c 3.96804,0.0224 11.34954,3.06781 13.30254,5.6813 2.23324,4.0972 -5.67779,11.39647 -11.07064,11.35383 -8.72659,-0.16024 -10.35356,-5.22651 -11.46286,-7.29723 -1.10931,-2.07071 -0.86289,-5.94087 -0.678,-6.96391 0.18488,-1.02303 2.40348,-2.45258 4.06745,-2.53886 1.2348,0.49123 2.11839,3.18003 2.55385,3.18533 0.47,0.006 0.41622,-1.71612 1.82211,-3.23494 0.40178,-0.13024 0.89868,-0.18873 1.46555,-0.18552 z" />
            </g>
        </svg>
        <div class="flex flex-row font-normal text-xl text-slate-400 mx-12 items-end absolute bottom-6">
            <img class="rounded-full shadow-xl mr-3" width="48"
                src="https://dcdn.dstn.to/avatars/303173495918034945?size=64" />
            sixfalls
        </div>
    </div>
</template>