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
    allAdministrators: null,
  },

  getters: {
    token: (state) => state.token,
    user: (state) => state.user,
    getAllAdministrators: (state) => state.allAdministrators,
    getSingleAdministrator: (state) => (id) => {
      return state.allAdministrators.find(
        (administrator) => administrator.id === id
      );
    },
  },

  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUserData(state, userData) {
      state.user = userData;
    },
    setAllAdministrators(state, allAdministrators) {
      state.allAdministrators = allAdministrators
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

    // fetch administrators 
    async allAdministrators({ commit }) {
      const response = await axios.get(api + "admin/list_adminstrators", {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        }
      })
      commit("setAllAdministrators", response.data.data);
    }
  },
  
  
  modules,
  // Enable strict mode in development to get a warning
  // when mutating state outside of a mutation.
  // https://vuex.vuejs.org/guide/strict.html
  // strict: process.env.NODE_ENV !== 'production',
})