import Vue from 'vue'
import Vuex from 'vuex'
import movies from './movies'
import tv from './tv'
import categories from "./categories";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    movies,
    tv,
    categories
  }
})
