<template>
  <div class="my-10">
  <p class="text-left ml-5 pl-8 font-bold text-xl text-gray-50 my-3">{{cls}}</p>

  <splide class="splide mx-5 px-8" :slides="data" :options="options">
      <splide-slide v-for="item in data"  :key="item.id">
          <movie v-if="type==='movie'" :movie="item" class="splide__slide1" @click.native="select(id)"></movie>
          <tv v-else :tv="item" class="splide__slide1" @click.native="select(id)"></tv>
      </splide-slide>
  </splide>
  </div>
</template>

<script>
import movie from '../movie'
import tv from '../tv'
export default {
  name: "slider",
  data() {
    return {
      options: {
        rewind: true,
        perPage: 5,
        gap: '1.1rem',
        pagination: false
      },
      data: []
    }
  },
  props: {
    cls: String,
    type: String,
    category: String,
    id: Number,
    request: String
  },
  components: {
    movie,
    tv
  },
  async mounted() {
    if(this.type ==='movie')
      this.data = await this.$store.dispatch(this.request, this.category)
    if(this.type === 'tv')
      this.data = await this.$store.dispatch(this.request, this.category)
  },
  methods:{
    select(id) {
      console.log(id)
      this.$emit('select', this.id)
    }
  }
}
</script>

<style >
.splide__list li:hover{
  transform: scale(1.03);
}
.splide__list li{
  transition: all .5s;
}
</style>
