<template>
  <div id="app relative">
      <login  v-if="showModal" class="fixed top-1/3 right-1/3 left-1/3" style="z-index: 100" @close="selectModal()">222</login>
    <div id="w-full relative">
      <navbar class="fixed top-0 z-40" :bg-color="color" @select-modal="selectModal()"></navbar>

    </div>
    <router-view/>
  </div>
</template>
<script>

import login from './components/login';
import navbar from "./components/custom-ui/navbar"
import axios from "axios";

export default {
  components: {
    navbar,
    login,
  },
  data() {
    return {
      color: 'transparent',
      showModal: false,
    }
  },
  async created() {

    window.addEventListener('scroll', this.setColor)
    this.setColor()
    axios.interceptors.response.use(undefined, function(err) {
      return new Promise(function() {
        if(err.status === 401) {
          this.$store.dispatch('auth/LOGOUT');
          console.log('err')
        }
        throw err;
      })
    })

    let {data} = await axios(`http://localhost:3000/api/v1/auth/user`);
    this.$store.commit('auth/SET_PROPERTY', {key: 'user', value: data})
    await this.$store.dispatch('list/GET_WATCHLIST');
    console.log(this.$store.state.list.watchlist)
  },
  async mounted() {
  },
  destroyed() {
    window.removeEventListener('scroll', this.setColor)
  },
  computed:{
    isAuth() {
      return this.$store.getters["auth/isAuthentificated"];
    }
  },
  methods: {
    setColor() {
      if(window) {
        const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
        if(currentScrollPosition <= 50) this.color = 'bg-transparent '
        if(currentScrollPosition > 50 || this.$route.name !== 'Home') this.color = 'bg-header-bg'
      }
    },
    selectModal() {
      console.log(300);
      this.showModal = !this.showModal;
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
