<template>
  <div class="relative  h-90v overflow-hidden">
    <div class=" h-90v bg-right bg-no-repeat bg-contain z-0 relative  overflow-hidden"
         :class="detailPage !== 0 ? 'filter blur-3xl brightness-50 transition duration 300' : ''"
         :style="`background-image: url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`">
      <youtube-vue v-if="video && detailPage === 0" ref="youtube" :videoid="video" :autoplay="1"
                   class="absolute -right-4 -top-20 h-120v w-4/5 	pointer-events-none" :controls="1" :rel="0" :fs="0"
                   :loop="1" :playlist="video"/>
    </div>
    <svg @click="$router.push({name: 'Home'})"
         class="absolute top-5 right-10 w-6 hover:text-white fill-current white transition duration 600 z-40"
         version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
         y="0px"
         viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001" xml:space="preserve">
<g>
	<g>
		<path d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717
			L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859
			c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287
			l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285
			L284.286,256.002z"/>
	</g>
</g>
      <g>
</g>
      <g>
</g>
      <g>
</g>
      <g>
</g>
      <g>
</g>
      <g>
</g>
      <g>
</g>
      <g>
</g>
      <g>
</g>
      <g>
</g>
      <g>
</g>
      <g>
</g>
      <g>
</g>
      <g>
</g>
      <g>
</g>
</svg>
    <div class="absolute flex w-full justify-center z-30 top-4 ">
      <nav-item-movie class="mr-4" name="О фильме" :status="detailPage === 0"
                      @click.native="detailPage = 0; mute = true"/>
      <nav-item-movie class="mr-4" name="Сезоны и серии" :status="detailPage === 1"
                      @click.native="detailPage = 1; mute = true"/>
      <nav-item-movie name="Детали" :status="detailPage === 2" @click.native="detailPage = 2"/>
    </div>

    <div class="ft z-10"></div>
    <div class="absolute top-8 left-0 z-20 h-full w-2/4 p-12" v-if="detailPage === 0">
      <div class="flex  items-center">
        <img class="w-40 rounded" :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`" alt="">
        <div class=" text-white ml-5 fans-serif text-left">
          <p class="whitespace-pre-line font-bold text-3xl mb-3"> {{ movie.name }} </p>
          <div class="text-gray-400	w-96">
            <span :class="movieStatus(movie.vote_average)" class="mr-2">{{ movie.vote_average.toFixed(1) }}</span>
            <span>{{ movie.first_air_date.split('-')[0] }}</span>
            <span v-for="genre in movie.genres.slice(0,2)" :key="genre.id"> {{ genre.name }} </span>
            <span>{{ movie.seasons.length }} сезонов</span>
          </div>
        </div>
      </div>
      <div class="text-overview font-sans mt-5 leading-6 text-left">
        {{ movie.overview.split(' ').splice(0, 30).join(' ') }}...
      </div>
      <button class="bg-button-play text-white p-3 rounded items-center flex mt-3"><img
          :src="require('@/assets/play.svg')" class="w-4 inline mr-2">Смотреть фильм
      </button>
    </div>
    <transition name="slide-fade">
      <seasons v-if="detailPage===1" class="absolute top-20 left-0 z-40" :data="movie"></seasons>
    </transition>
    <transition name="slide-fade">
      <Details v-if="detailPage===2" class="absolute top-20 left-0 z-40" :data="movie"></Details>
    </transition>
    <div @click="muteOrUnmute" v-if="video && detailPage ===0"
         class="absolute right-10 bottom-5 bg-gray-500 p-3 rounded-full w-12">
      <img v-if="!mute" :src="require('@/assets/mute.svg')" alt="">
      <img v-else :src="require('@/assets/unmute.svg')" alt="">
    </div>
  </div>
</template>

<script>
import YoutubeVue from "../components/YoutubeVue";
import navItemMovie from '../components/custom-ui/nav-item-movie'
import Details from "../components/details";
import Seasons from "../components/seasons";

export default {
  name: "movie",
  components: {
    Seasons,
    YoutubeVue,
    navItemMovie,
    Details
  },
  head: {
    title: function () {
      return {
        inner: this.movie.name
      }
    },
    meta: function () {
      return [
        {name: 'application-name', content: 'KinoPoiskHD'},
        {name: 'description', content: this.movie.overview, id: 'desc'},
        {name: 'twitter:title', content: `${this.movie.name}-KinoHD`},
        // with shorthand
        {n: 'twitter:description', c: `${this.movie.overview}-KinoHD`},
        // Google+ / Schema.org
        {itemprop: 'name', content: this.movie.name},
        {itemprop: 'description', content: `${this.movie.overview}-KinoHD`},
        // Facebook / Open Graph
        {property: 'og:title', content: this.movie.name},
      ]
    }
  },
  data() {
    return {
      movie: {},
      video: null,
      mute: true,
      detailPage: 0
    }
  },
  computed: {
    getParams() {
      return this.$route.params.id.split('-');
    }
  },
  watch: {
    async $route(to, from) {
      if (to !== from) {
        this.movie = await this.$store.dispatch('tv/getTV', this.$route.params.id);
        this.video = await this.$store.dispatch('tv/getTVVideo', this.$route.params.id);
        this.detailPage = 0;
      }
    },
  },
  async mounted() {
    this.movie = await this.$store.dispatch('tv/getTV', this.$route.params.id);
    this.video = await this.$store.dispatch('tv/getTVVideo', this.$route.params.id);
  },
  methods: {

    checkRun(runtime) {
      return `${Math.floor(runtime / 60)} час ${runtime % 60} минут`;
    },
    muteOrUnmute() {
      this.mute ? this.$refs.youtube.player.mute() : this.$refs.youtube.player.unMute();
      this.mute = !this.mute;
    },
    changeDetail() {
      console.log(1)
    },
    movieStatus(vote) {
      let str = 'p-1 rounded text-gray-100'
      if (vote >= 8.0) return str+' bg-green-600'
      if (vote >= 6.0 && vote < 8.0) return str+ ' bg-yellow-600'
      if (vote >= 5.0 && vote < 6.0) return str+' bg-gray-600'
      if (vote < 5.0) return str+' bg-red-600'
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

.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active до версии 2.1.8 */
{
  transform: translateY(20px);
  opacity: 0;
}
</style>
