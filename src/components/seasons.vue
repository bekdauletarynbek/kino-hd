<template>
  <div class="px-12 text-gray-200 w-full">
   <div>
        <img class="w-28 rounded" :src="`https://image.tmdb.org/t/p/w300${data.poster_path}`" alt="">
   </div>
   <div class="inform text-left mt-4 font-medium">
      <span class="mr-4">Сезон</span>
        <span v-for="item in data.seasons" :key="item.id" @click="season=item.season_number" :class="season === item.season_number ? 'bg-gray-600' : ''">{{item.season_number}}</span>
   </div>
    <serial class="mt-5 h-20v" :season="season" :id="data.id"></serial>
  </div>
</template>

<script>
import serial from "./series";
export default {
  name: "seasons",
  data() {
    return {
      season: 1,
      add: 0,
    }
  },
  props: {
    data: Object
  },
  mounted() {
    console.log(this.data)
  },
  components: {
    serial
  }
}
</script>

<style lang="scss" scoped>
.inform {
    span {
      padding: 8px 12px;
      border-radius: 50%;
      user-select: none;
      cursor: pointer;
  }
}
</style>
