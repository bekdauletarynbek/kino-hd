<template>
<router-link :to="link" class="mx-5 text-lg font-semibold  border-b-2 hover:text-gray-300" :class="$route.path === link ? ' text-gray-300 border-yellow-500' : 'text-gray-400 border-transparent'">
  {{text}}
</router-link>
</template>

<script>
export default {
  name: "nav-item",
  props: {
    'text': String,
    'link': String
  }
}
</script>

<style scoped>

</style>
