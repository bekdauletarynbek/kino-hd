<template>
  <div id="app">
    <div id="w-full">
      <navbar></navbar>
    </div>
    <router-view/>
  </div>
</template>
<script>
import navbar from "./components/custom-ui/navbar";
export default {
  components: {
    navbar
  }
}

</script>
<style lang="scss">
body{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #141414;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
