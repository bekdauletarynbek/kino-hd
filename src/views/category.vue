<template>
  <div class="text-gray-300">
    <p class="text-white font-medium text-3xl">{{$route.params.id.split('-')[1].toUpperCase()}}</p>
    <div class="grid grid-cols-4 gap-5">
      <movie v-for="item in data" :movie="item" :key="item.id"></movie>
    </div>
  </div>
</template>

<script>
import movie from '@/components/movie'
export default {
  name: "category",
  data() {
    return {
      data: null
    }
  },
  components:{
    movie
  },
  async mounted() {
    let params = this.$route.params.id.split('-');
    if(params.length >=3) {
      this.data = await this.$store.dispatch('movies/getMoviesWithGenre', {params: params[2], genreId: params[0]})
    }
    else{
      this.data = await this.$store.dispatch('movies/getMoviesWithGenre', {genreId: params[0]});
    }
  }
}
</script>

<style scoped>

</style>
