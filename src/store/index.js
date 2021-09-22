import Vue from 'vue'
import Vuex from 'vuex'
import movies from './movies'
import tv from './tv'
import categories from "./categories";
import auth from "@/store/auth";
import user from "@/store/user";
import list from '@/store/list';

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
    categories,
    auth,
    user,
    list
  }
})
