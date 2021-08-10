<template>
<div class="">
  <router-view class="mt-16" v-if="$route.name !== 'Home' && slide === 0"></router-view>
  <banner v-else :id="getIdForBanner()" :type="$route.name !== 'Home' ? $route.name : 'movie'"></banner>
  {{$route.name}}
  <div v-for="(item, id) in list" :key="item.key">
    <slider :type="'movie'" :category="item.key" :cls="item.value" @select="select" :id="id+1" request="movies/getMovies"></slider>
    <transition name="bottom-slide">
      <router-view v-if="slide === id +1"></router-view>
    </transition>
  </div>
  <div>
  <genres />
  <search></search>
  </div>
  <div v-for="(item, id) in listTV" :key="item.key">
    <slider :type="'tv'" :category="item.key" :cls="item.value" @select="select" :id="id+5" request="tv/getTVs"></slider>
    <transition name="bottom-slide">
      <router-view v-if="slide === id +5"></router-view>
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
import search from "@/components/seacrh";
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
      params: null,
      id: null
    }
  },
  components: {
    banner,
    slider,
    genres,
    collections,
    search
  },
  watch:{
    $route(to, from) {
      if(to !== from) {
        let id = to.params.id.toString()
        if(id.split('-').length > 1)
        this.slide = id.split('-')[1]
        else {
          this.slide = 0;
        }
      }
    }
  },
  computed: {

  },
  mounted() {
    if(this.$route.params.id)
    this.slide = +this.$route.params.id.split('-')[1];
    console.log(this.$route)
  },
  methods:{
    getMovies(type) {
      console.log(this.$store.state.movies[type])
      return this.$store.state.movies[type];
    },
    select(id) {
      console.log(id)
      this.slide = id;
    },
    getIdForBanner() {
      this.id =  +this.$route.params.id || 497698;
      return this.id;
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
