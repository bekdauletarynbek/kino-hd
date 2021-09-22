<template>
  <div class="text-gray-300 mt-24 px-14">
    <div class="grid grid-columns">
      <movie class="block" v-for="item in dataMovie" :movie="item" :key="item.id"></movie>
      <tv class="block" v-for="item in dataTV" :tv="item" :key="item.id"></tv>
    </div>
  </div>
</template>

<script>
import movie from '@/components/movie'
import tv from '@/components/tv'
import ahttp from "../services/ahttp";
import api from "../services/api";
export default {
  name: "list",
  data() {
    return {
      dataTV: null,
      dataMovie: null,
      page: 1
    }
  },
  components:{
    movie,
    tv
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
    let user = this.$store.state.auth.user;
    console.log(user)
    await this.$store.dispatch('list/GET_WATCHLIST', user);
    await this.$store.dispatch('list/GET_MOVIES').then((res) => {
      this.dataMovie = res.listMovie;
      this.dataTV = res.listTV;
    })
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
