<template>
  <div class="text-gray-300">
    <p class="text-white my-4 font-medium text-2xl" v-if="$route.params.id.split('-')[1]">{{$route.params.id.split('-')[1].toUpperCase()}}</p>
    <div class="grid grid-columns">
      <movie class="block" v-for="item in data" :movie="item" :key="item.id"></movie>
    </div>
  </div>
</template>

<script>
import movie from '@/components/movie'
import ahttp from "../services/ahttp";
import api from "../services/api";
export default {
  name: "category",
  data() {
    return {
      data: null,
      page: 1
    }
  },
  components:{
    movie
  },
  computed: {
    params() {
      return this.$route.params.id.split('-');
    }
  },
  created() {
    window.addEventListener('scroll', this.loadMore);
  },
  destroyed() {
    window.removeEventListener('scroll', this.loadMore);
  },
  async mounted() {
    let params = this.params;
    if(params.length >=3) {
      this.data = await this.$store.dispatch('movies/getMoviesWithGenre', {params: params[1], genreId: params[0]})
    }
    else{
      this.data = await this.$store.dispatch('movies/getMoviesWithGenre', {genreId: params[0]});
    }
  },
  methods: {
    async loadMore() {
      let params = this.params;
      console.log('scrool', window.innerHeight + window.scrollY);
      console.log('document', document.body.offsetHeight);
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        let {data} = await ahttp.get(`/movie/popular?${api}&with_genres=${params[0]}&page=${this.page}`);
        this.page+=1;
        this.data.push(...data.results)
      }
    }
  }
}
</script>

<style scoped>
.grid-columns{
  display: grid;
  grid-row-gap: 1.5em;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
</style>
