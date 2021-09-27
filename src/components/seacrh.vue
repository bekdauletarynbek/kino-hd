<template>
<div>
  <div class="flex">
<!--    <input type="text" @focusin="searchMulti()" v-model="search">-->
    <button>Search</button>
  </div>
  {{data}}
</div>
</template>

<script>
import ahttp from "@/services/ahttp";
import api from "@/services/api";

export default {
  name: "seacrh",
  data() {
    return {
      search: null,
      focus: false,
      data: null
    }
  },
  methods: {
    searchMulti() {
      setInterval(async()=>{
        let {data} = ahttp.get(`search/multi?${api}`, {
          query: this.search
        })
        this.data = data;
      }, 300)
    }
  }
}
</script>

<style scoped>

</style>