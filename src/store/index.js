import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'
import createPersistedState from "vuex-persistedstate"
import axios from "axios";

const api = process.env.VUE_APP_BASE_URL;
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    token: null,
    user: null,
  },
  getters: {
    token: (state) => state.token,
    user: (state) => state.user,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUserData(state, userData) {
      state.user = userData;
    },
    clearUserData(state) {
      state.token = null;
      state.user = null;
      location.reload();
    },
  },
  actions: {
    // user login
    async login({ commit }, credentials) {
      await axios.post(api + "admin/login", credentials).then((response) => {
        const userData = response.data;
        commit("setUserData", userData.data);
        commit("setToken", userData.token);
      });
    },
    // user logout
    logout({ commit }) {
      commit("clearUserData");
    },
  },
  
  
  modules,
  // Enable strict mode in development to get a warning
  // when mutating state outside of a mutation.
  // https://vuex.vuejs.org/guide/strict.html
  // strict: process.env.NODE_ENV !== 'production',
})