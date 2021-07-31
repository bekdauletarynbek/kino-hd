<template>
  <div>
    <router-link :to="{name: 'tv', params: {id: `${tv.id}-${id}`}}">
      <img class="rounded relative" :src="`https://image.tmdb.org/t/p/w200/${tv.poster_path}`" alt="">
      <span class="absolute top-1 left-1 px-2 "
            :class="movieStatus(tv.vote_average)">{{ tv.vote_average.toFixed(1) }}</span>
    </router-link>
  </div>
</template>

<script>
import movieStatus from "@/services/movieStatus";
export default {
  name: "movie",
  mixins: [movieStatus],
  props: {
    tv: Object,
    id: Number
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
