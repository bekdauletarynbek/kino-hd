import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css';
import VueSplide from "@splidejs/vue-splide";
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import axios from "axios";
import VueMeta from "vue-meta";

Vue.config.productionTip = false

Vue.use(VueSplide)

Vue.use(VueMeta)

let token = localStorage.getItem('user-token');
if(token)  {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
