import Vue from 'vue'
import Vuex from 'vuex'
import movies from './movies'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiKey: '8c4cb0d160e5f86bb53f5119cc39fe01'
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    movies
  }
})
