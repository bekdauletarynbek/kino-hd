<template>
<div class="h-90v bg-gray-900 w-full relative  overflow-hidden" >
  <div class=" h-90v bg-center bg-no-repeat bg-cover z-0 relative "
       :style="`background-image: url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`">
    <div  v-if="video1 && isShow">
    <vue-youtube ref="youtubes" :videoid="video1" :autoplay="1"
                 class="absolute  -top-24 h-120v w-full " :controls="1" :rel="0" :fs="0"
                 :loop="1" :playlist="video1" @played="isShow = true"/>
    </div>
  </div>
  <div class="absolute top-5 left-0 z-20 w-2/4 p-12">
    <div class="">
      <img class="w-40 rounded" :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`" alt="">
    </div>
  </div>
  <button class="bg-button-play absolute bottom-5 ml-12 text-white p-3 rounded items-center flex mt-3">
    <img
      :src="require('@/assets/play.svg')" class="w-4 inline mr-2">Смотреть фильм
  </button>
  <div @click="muteOrUnmute" class="absolute right-10 bottom-5 bg-gray-500 p-3 rounded-full w-12">
  <img v-if="!mute" :src="require('@/assets/mute.svg')" alt="">
  <img v-else :src="require('@/assets/unmute.svg')" alt="">
</div>
</div>
</template>

<script>
import ahttp from "../../services/ahttp";
import api from "../../services/api";
import VueYoutube from "../YoutubeVue";
import movieStatus from "../../services/movieStatus";


export default {
  name: "banner",
  mixins: [movieStatus],
  data() {
    return {
      movie: null,
      detailPage: 0,
      video1: null,
      mute: true,
      isShow: false
    }
  },
  props: {
    id: Number,
    type: String
  },
  components: {
    VueYoutube
  },
  async mounted() {
    let {data} = await ahttp.get(`/${this.type}/${this.id}?${api}`);
    console.log(data)
    this.movie = data;
    let videos  = await ahttp.get(`/${this.type}/${this.id}/videos?${api}`);
    this.video1 = videos.data.results[0].key;

  },
  created() {
    window.addEventListener('scroll', this.setColor)
  },
  destroyed() {
    window.removeEventListener('scroll', this.setColor)
  },
  methods:{
    checkRun(runtime) {
      return `${Math.floor(runtime / 60)} час ${runtime % 60} минут`;
    },
    muteOrUnmute() {
      this.mute ? this.$refs.youtubes.player.mute() : this.$refs.youtubes.player.unMute();
      this.mute = !this.mute;
    },
    setColor() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      if(currentScrollPosition <= 50) this.isShow = true
      if(currentScrollPosition > 50) this.isShow = false
    }
  }
}
</script>

<style scoped>

.ft {
  position: absolute;
  top: 0;
  left: 0;
  background: rgb(2, 0, 36);
  background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 49%, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7), rgba(57, 61, 62, 0.003) 100%);
  z-index: 1;
  width: 60%;
  height: 100%;
}
</style>
