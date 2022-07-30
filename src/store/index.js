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
    allAttires: null,
    allServices: null,
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
      getAllAttires: (state) => state.allAttires,
      getSingleAttire: (state) => (id) => {
        return state.allAttires.find(
          (attire) => attire.id === id
          );
        },
        getAllServices: (state) => state.allServices,
        getSingleService: (state) => (id) => {
          return state.allServices.find(
            (service) => service.id === id
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
        SET_ALL_ATTIRES(state, allAttires) {
          state.allAttires = allAttires
        },
        SET_ALL_SERVICES(state, allServices) {
          state.allServices = allServices
        },
        clearUserData(state) {
          state.token = null;
          state.user = null;
          state.allAdministrators = null;
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
          const response = await axios.get(api + "admin/list_administrators", {
            headers: {
              Authorization: `Bearer ${this.state.token}`,
            }
          })
          commit("setAllAdministrators", response.data.data);
        },
        
        // fetch attires
        async allAttires({commit}) {
          const response = await axios.get(api + "admin/attires", {
            headers: {
              Authorization: `Bearer ${this.state.token}`,
            }
          })
          console.log(response);
          commit("SET_ALL_ATTIRES", response.data.data);
        },

        // fetch services 
        async allServices({ commit }) {
          const response = await axios.get(api + "admin/services", {
            headers: {
              Authorization: `Bearer ${this.state.token}`,
            }
          })
          console.log(response)
          commit("SET_ALL_SERVICES", response.data.data);
        }
      },
      
      
      modules,
      // Enable strict mode in development to get a warning
      // when mutating state outside of a mutation.
      // https://vuex.vuejs.org/guide/strict.html
      // strict: process.env.NODE_ENV !== 'production',
    })