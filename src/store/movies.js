import ahttp from '../services/ahttp'
import api from '../services/api'

export default {
    namespaced: true,
    state: {
        movies: []
    },
    mutations: {
        SET_PROPERTY(state, value) {
            state[value.key] = value.value;
        }
    },
    actions: {
        async getMovies({commit}) {
            let { data } = await ahttp.get(`/trending/all/day?${api}`)
            commit('SET_PROPERTY', {
                key: 'movies',
                value: data
            })
        }
    },
    getters: {

    }
}
