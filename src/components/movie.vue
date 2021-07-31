<template>
    <router-link :to="{name: 'movie', params: {id: `${movie.id}${id ? `-${id}` : ''}`}}" class="relative">
        <img class="rounded" :src="`https://image.tmdb.org/t/p/w200/${movie.poster_path}`" alt="">
        <span class="absolute top-1 left-1 px-2 "
              :class="movieStatus(movie.vote_average)">{{ movie.vote_average.toFixed(1) }}</span>
    </router-link>
</template>

<script>
import movieStatus from "../services/movieStatus";
export default {
  name: "movie",
  mixins: [movieStatus],
  props: {
    movie: Object,
    id: Number
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
