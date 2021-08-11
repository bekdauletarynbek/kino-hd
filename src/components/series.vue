<template>
  <div>
  <splide :slides="movie.episodes" :options="options">
    <splide-slide  class="mx-5 px-2" v-for="(item, id) in movie.episodes" :key="item.id">
          <tv-episode :item="item" :id="id+1"></tv-episode>
    </splide-slide>
  </splide>
  </div>
</template>

<script>
import tvEpisode from './tv-episode'
export default {
  name: "series",
  components:{
    tvEpisode
  },
  data() {
    return {
      options: {
        rewind: true,
        perPage: 4,
        gap: '1.1rem',
        pagination: false,
        lazyload: true
      },
      movie: []
    }
  },
  props: {
    season: Number,
    id: Number
  },
  watch:{
    async season(){
      this.movie = await this.$store.dispatch('tv/getTVSeason', {id: this.id, season_number: this.season})
    }
  },
  async mounted() {
    console.log(this.season)
    this.movie = await this.$store.dispatch('tv/getTVSeason', {id: this.id, season_number: this.season})
  }
}
</script>

<style scoped>
</style>
