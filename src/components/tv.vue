<template>
  <div>
    <router-link :to="{name: 'tv', params: {id: `${tv.id}${id ? `-${id}` : ''}`}}">
      <img class="rounded relative" :src="`https://image.tmdb.org/t/p/w200/${tv.poster_path}`" alt="">
      <span class="absolute top-1 left-1 px-2 "
            :class="movieStatus(tv.vote_average)">{{ tv.vote_average.toFixed(1) }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "movie",
  props: {
    tv: Object,
    id: Number
  },
  methods: {
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

</style>
