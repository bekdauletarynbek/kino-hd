<template>
<div class="flex items-center font-sans font-medium py-2 px-8 rounded-3xl select-none hover:text-gray-100" :class="status ? 'bg-gray-900 text-gray-100 transition duration 800' : ' text-gray-200'">
      {{name}}
</div>
</template>

<script>
export default {
  name: "nav-item-movie",
  props: {
    name: String,
    status: Boolean
  }
}
</script>

<style scoped>

</style>
