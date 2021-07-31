import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css';
import VueSplide from "@splidejs/vue-splide";
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import VueHead from "vue-head";

Vue.config.productionTip = false

Vue.use(VueSplide)

Vue.use(VueHead);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
