<template>
<div class="h-80v bg-gray-900 w-full relative" :style="{'background-image': bkg}">
  <img :src="logo" :alt="text" class="absolute ">
</div>
</template>

<script>
export default {
  name: "banner",
  props: {
    logo: String,
    bkg: String,
    text: String,
    link: String
  }
}
</script>

<style scoped>

</style>
