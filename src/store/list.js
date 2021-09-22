import axios from "axios";
import ahttp from "@/services/ahttp";
import api from "@/services/api";

export default {
    namespaced: true,
    state: {
        watchlist:  null,
    },
    getters: {
        inList: state=> (id,type)=>{
            return state.watchlist[type].indexOf(+id) > -1;
        }
    },
    mutations: {
        SET_PROPERTY(state, payload) {
            state[payload.key] = payload.value;
        }
    },
    actions: {
        async GET_WATCHLIST({commit}) {
                let {data} = await axios.get(`http://localhost:3000/api/v1/watchlist/`);
                commit('SET_PROPERTY', {
                    key: 'watchlist',
                    value: data,
                })
        },
        CHANGE_WATCHLIST({commit, state}, {action, type, id}) {
            return new Promise((resolve)=> {
                let arr = state.watchlist[type];
                if(action === 'delete') {
                    axios.delete(`http://localhost:3000/api/v1/watchlist/${id}`, {
                        data:{
                            type: type
                        }
                    }).then(()=> {
                        commit('SET_PROPERTY', {
                            key:'watchlist',
                            value: arr.filter((k)=> k !== id),
                        })
                    });
                    resolve(false)
                }
                else if(action === 'save') {
                    axios.post(`http://localhost:3000/api/v1/watchlist`, {
                        watch: id,
                        type: type,
                    }).then(()=> {
                        commit('SET_PROPERTY', {
                            key: `watchlist[${type}]`,
                            value: [...arr, id],
                        })
                    });
                    resolve(true)
                }
            })
        },
        GET_MOVIES({state}) {
            return new Promise((resolve) => {
                let listMovie = state.watchlist['listMovie'],
                    listTV = state.watchlist['listTV'],
                    listDataMovie = [],
                    listDataTV = [];
                listMovie.forEach(async(k)=>{
                    let {data} = await ahttp.get(`/movie/${k}?${api}`);
                    console.log(data)
                    listDataMovie.push(data);
                })
                listTV.forEach(async(k)=>{
                    let {data} = await ahttp.get(`/tv/${k}?${api}`);
                    listDataTV.push(data);
                })
                resolve({listMovie: listDataMovie, listTV: listDataTV});
            })
        }
    }
}