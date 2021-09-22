import ahttp from "../services/ahttp";
import api from "../services/api";

export default {
    namespaced: true,
    actions: {
        async getDataMovie(context, {id, type}) {
            let {data} = await ahttp.get(`/movie/${type}?${api}&with_genres=${id}`);
            return data;
        },
        async getDataTv(context, {id, type}) {
            let {data} = await ahttp.get(`/tv/${type}?${api}&with_genres=${id}`);
            return data;
        }
    }
}
