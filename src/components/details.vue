<template>
<div class="px-12 flex">
  <div class="w-1/2 text-left">
    <img class="w-28 rounded" :src="`https://image.tmdb.org/t/p/w300${data.poster_path}`" alt="">
    <div class="mt-8">
      <span :class="movieStatus(data.vote_average)" class="p-2">{{ data.vote_average.toFixed(1) }}</span>
      <p class="mt-2 text-gray-500 text-sm">{{data.vote_count}} оценок</p>
    </div>
    <div class="text-overview font-sans mt-2 leading-6 text-left">
      {{data.overview}}
    </div>
  </div>
  <div class="px-32 flex justify-between mt-5 text-gray-100 text-sm text-left">
    <div class="mr-10">
      <p  class="text-gray-300 text-xs font-medium mb-2">В главных ролях</p>
      <p v-for="actor in getActors()" :key="actor.id">{{actor.name}}</p>
      <p  class="text-gray-300 text-xs font-medium mb-2 mt-6" v-if="getDirector()">Режиссеры</p>
      <p v-if="getDirector()">{{getDirector().name}}</p>
    </div>
    <div class="">
      <p class="text-gray-300 text-xs  font-medium mb-3">Аудиодорожки</p>
      <p>Русский</p>
      <p>Английский</p>
      <p  class="text-gray-300 text-xs font-medium mb-2 mt-6">Субтитры</p>
      <p>Русский</p>
      <p>Английский</p>
      <p  class="text-gray-300 text-xs font-medium mb-2 mt-6">Оригинальное название</p>
      <p>{{data.original_title || data.original_name}}</p>
    </div>
  </div>
</div>
</template>

<script>
import movieStatus from "../services/movieStatus";
export default {
  name: "details",
  props: {
    data: Object
  },
  mixins:[movieStatus],
  data() {
    return {
    }
  },
  watch: {
    // $route(to, from){
    //
    // }
  },
  methods: {
    getDirector() {
      return this.data.credits.crew.find(k=> k.job === 'Director')
    },
    getActors() {
      return this.data.credits.cast.slice(0, 10);
    }
  }
}
</script>

<style scoped>

</style>
