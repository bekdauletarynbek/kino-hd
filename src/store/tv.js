import ahttp from "../services/ahttp";
import api from '../services/api';
export default {
    namespaced: true,
    actions: {
        async getTVs(context, type) {
            let {data} = await ahttp.get(`/tv/${type}?${api}`);
            console.log(data)
            return data.results;
        },
        async getTV(context, id) {
            let {data} = await ahttp.get(`/tv/${id}?${api}&append_to_response=credits`);
            console.log(data)
            return data;
        },
        async getTVSeason(context, {id, season_number}) {
            let {data} = await ahttp.get(`/tv/${id}/season/${season_number}?${api}&append_to_response=credits`);
            console.log(data)
            return data;
        },
        async getTVVideo(context, id) {
            let {data} = await ahttp.get(`/tv/${id}/videos?${api}`)
            console.log(data.results)
            if(!data.results.length) return null;
            return data.results[0].key
        },
    }
}
