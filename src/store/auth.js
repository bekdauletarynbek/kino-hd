import axios from "axios";

export default {
    namespaced: true,
    state: {
        token: localStorage.getItem('user-token') || '',
        status: '',
        user: null,
        watchlist: {}
    },
    getters: {
        isAuthentificated: state => !!state.token,
        authStatus: state => state.status,
    },
    mutations: {
        AuthUser(context, payload) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${payload.token}`;
        },
        SET_PROPERTY(state, payload) {
            state[payload.key] = payload.value;
        }
    },
    actions: {
        AUTH_REQUEST: ({commit}, {email, password}) => {
            return new Promise((resolve, reject) => {
                commit('SET_PROPERTY', {
                    key: 'status',
                    value: 'loading'
                });
                axios.post('http://localhost:3000/api/v1/auth/login', {
                    username: email,
                    password: password
                }).then(resp => {
                    let token = resp.data.token;
                    localStorage.setItem('user-token', token);
                    commit('SET_PROPERTY', {
                        key: 'status',
                        value: 'success',
                    });

                    commit('user/SET_PROPERTY', {
                        key: 'user',
                        value: {...resp.data.user}
                    })
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    resolve(resp);
                }).catch(err => {
                    commit('SET_PROPERTY', {
                        key: 'status',
                        value: 'error',
                    });
                    localStorage.removeItem('user-token');
                    reject(err);
                })
            });
        },
        LOGOUT({commit}) {
            return new Promise((resolve)=> {
                commit('SET_PROPERTY', {
                    key: 'status',
                    value: ''
                });
                commit('SET_PROPERTY', {
                    key: 'user',
                    value: null
                })
                localStorage.removeItem('user-token');
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        },
        UPDATE({commit}, payload) {
            return new Promise((resolve, reject) => {
                let {data} = axios.post('http://localhost:3000/api/v1/users/update', {
                    ...payload
                });
                commit('SET_PROPERTY', {
                    key: 'user',
                    value: {...payload},
                })
                if(data) resolve(data);
                reject();
            })
        },

    }
}