import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css';
import VueSplide from "@splidejs/vue-splide";
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
// import VueYT from 'youtube-vue'

Vue.config.productionTip = false

Vue.use(VueSplide)

// Vue.use(VueYT)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
