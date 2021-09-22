export default {
    namespaced: true,
    state: {
        user: {}
    },
    mutations: {
        SET_PROPERTY(state, payload) {
            state[payload.key] = payload.value;
        }
    }
}