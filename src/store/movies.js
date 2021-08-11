import ahttp from '../services/ahttp'
import api from '../services/api'

export default {
    namespaced: true,
    state: {
        movies: {
        },
    },
    mutations: {
        SET_PROPERTY(state, value) {
            console.log(value)
            state[value.key] = value.value;
        }
    },

    actions: {
        async getMovies(context, type) {
            let { data } = await ahttp.get(`/movie/${type}?${api}`)
            return data.results
        },
        async getMoviesWithGenre(context, {params, genreId}) {
            let data
            if (params) {
                let data = await ahttp.get(`/movie/${params}?${api}&with_genres=${genreId}`)
                return data.data.results;
            }
            data = await ahttp.get(`/movie/popular?${api}&with_genres=${genreId}`)
            return data.data.results;
        },
        async getMovie(context, {id, type}) {
            let {data} = await ahttp.get(`/${type}/${id}?${api}&append_to_response=credits`)
            console.log(data)
            return data
        },
        async getMovieVideo(context, {id, type}) {
            let {data} = await ahttp.get(`/${type}/${id}/videos?${api}`)
            console.log(data.results)
            if(!data.results.length) return null;
            return data.results[0].key
        },
    },
    getters: {
        getState() {

        }
    }
}
