import Vue from 'vue'
import Vuex from 'vuex'
import localStorage from "./localStorage";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        accessToken: null,
        loggingIn: false,
    },
    mutations: {
        loginStart: state => state.loggingIn = true,
        loginStop: (state, errorMessage) => {
            state.loggingIn = false;
            state.loginError = errorMessage;
        },
        updateAccessToken: (state, accessToken) => {
            state.accessToken = accessToken;
        },
        logout: (state) => {
            state.accessToken = null;
        }
    },
    actions: {
        initLogin({ commit }) {
            console.log('InitLogin action...')
            commit('updateAccessToken', localStorage.get('token'));
            commit('loginStart');

        },
        initLogout({ commit }) {
            localStorage.remove('token');
            commit('updateAccessToken', null);
            commit('logout');
            commit('loginStop', null);
        }

    }
})