<template>
  <div id="app relative">
    <div id="w-full relative">
      <navbar class="fixed top-0 z-40" :bg-color="color"></navbar>
    </div>
    <router-view/>
  </div>
</template>
<script>
import navbar from "./components/custom-ui/navbar";
export default {
  components: {
    navbar
  },
  data() {
    return {
      color: 'transparent'
    }
  },
  created() {
    window.addEventListener('scroll', this.setColor)
  },
  destroyed() {
    window.removeEventListener('scroll', this.setColor)
  },
  computed:{
  },
  methods: {
    setColor() {
      if(window) {
        const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
        if(currentScrollPosition <= 50) this.color = 'transparent '
        if(currentScrollPosition > 50) this.color = 'bg-header-bg'
      }
    }
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
