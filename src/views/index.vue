<template>
<div class="">
  <banner :id="getIdForBanner()"></banner>
  <div v-for="(item, id) in list" :key="item.key">
    <slider :type="'movie'" :category="item.key" :cls="item.value" @select="select" :id="id" request="movies/getMovies"></slider>
    <transition name="bottom-slide">
      <router-view v-if="slide === id"></router-view>
    </transition>
  </div>
  <div>
  <genres />
</div>
  <div v-for="(item, id) in listTV" :key="item.key">
    <slider :type="'tv'" :category="item.key" :cls="item.value" @select="select" :id="id+4" request="tv/getTVs"></slider>
    <transition name="bottom-slide">
      <router-view v-if="slide === id +4"></router-view>
    </transition>
  </div>
  <collections></collections>
</div>
</template>

<script>
import banner from '../components/custom-ui/banner'
import slider from '../components/custom-ui/slider'
import genres from '@/components/genres'
import collections from "../components/collections";
export default {
  name: "index",
  data() {
    return {
      list: [
        {key: 'now_playing', value: 'Сейчас смотрят'},
        {key: 'popular', value: 'Популярное'},
        {key: 'top_rated', value: 'ТОП'},
        {key: 'upcoming', value: 'Набирают популярность'}
      ],
      listTV: [
        {key: 'popular', value: 'Популярное'},
        {key: 'top_rated', value: 'ТОП'},
      ],
      slide: null,
      params: null
    }
  },
  components: {
    banner,
    slider,
    genres,
    collections
  },
  computed: {

  },
  mounted() {
    if(this.$route.params.id)
    this.slide = +this.$route.params.id.split('-')[1];
  },
  methods:{
    getMovies(type) {
      console.log(this.$store.state.movies[type])
      return this.$store.state.movies[type]
    },
    select(id) {
      this.slide = id;
    },
    getIdForBanner() {
      return this.$route.params.id ||497698
    }
  },
  async updated() {
    let list = [
      'now_playing',
      'popular',
      'top_rated'
    ];
    for (const k of list) {
      await this.$store.dispatch('movies/getMovies', k);
    }
  }
}
</script>

<style scoped>

.bottom-slide-enter-active {
  transition: all .3s ease;
}

.bottom-slide-enter, .bottom-slide-leave-to
  /* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
