<template>
<div class="text-left item">
  <img  class="splide__slide rounded" :src="`https://image.tmdb.org/t/p/w500${item.still_path}`" alt="">
  <p class="mt-1">{{id}}. {{item.name}}</p>
</div>
</template>

<script>
export default {
  name: "tv-episode",
  props: {
    item: Object,
    id: Number
  }
}
</script>

<style lang="scss" scoped>
.item{
  transition: all .3s;
  &:hover {
    filter: brightness(0.7);
  }
}
</style>
