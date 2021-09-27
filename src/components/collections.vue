<template>
  <div class="">
    {{data}}
  </div>
</template>

<script>
import ahttp from "../services/ahttp";
import api from "../services/api";

export default {
  name: "collections",
  data() {
    return {
      data: null
    }
  },
  async mounted() {
    let {data} = await ahttp.get(`collection/list?${api}`);
    this.data = data
  }
}
</script>

<style scoped>

</style>
