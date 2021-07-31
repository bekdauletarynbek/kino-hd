<template>
  <div class="mx-5 px-8">
    <p class="text-left ml-5 font-bold text-xl text-gray-50 my-3">Жанры фильмов</p>
<splide  :slides="genres" :options="options">
  <splide-slide v-for="(item, id) in genres" :key="item.id">
    <router-link :to="{name: 'category', params: {id: `${item.id}-${item.name}`}}">
    <span class=" py-14 text-2xl flex items-center justify-center rounded font-sans" :style="{backgroundColor:  randomColor()[id]}">{{item.name}}</span>
    </router-link>
  </splide-slide>
</splide>
  </div>
</template>

<script>
import randomColor from "randomcolor"
import ahttp from "../services/ahttp";
import api from "../services/api";

export default {
  name: "genres",
  data() {
    return {
      genres: null,
      options: {
        rewind: true,
        perPage: 5,
        gap: '1.1rem',
        pagination: false
      },
    }
  },
  async mounted() {
    let {data} = await ahttp.get(`/genre/movie/list?${api}`);
    console.log(data.genres)
    this.genres = data.genres;
    let index = this.genres.findIndex(k=> k.name === 'телевизионный фильм');
    this.genres[index].name = 'ТВ'
  },
  methods: {
    randomColor() {
      return randomColor({
        luminosity: 'light',
        count: this.genres.length,

      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
