import Vue from 'vue';
import Vuex from 'vuex';

import modules from './modules';
import createPersistedState from 'vuex-persistedstate';
import axios from 'axios';

const api = process.env.VUE_APP_BASE_URL;
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    token: null,
    user: null,
    allAdministrators: null,
    allAttires: null,
    allServices: null,
    roles: null,
    deliveryMethods: null,
    attireGroup: null,
    transactions: null
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
          getAllDeliveryMethods: (state) => state.deliveryMethods,
          getSingleDeliveryMethod: (state) => (id) => {
            return state.deliveryMethods.find(
              (methods) => methods.id === id
              );
            },
            getRoles: (state) => state.roles,
            getAttireGroup: (state) => state.attireGroup,
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
            SET_ALL_DELIVERY_METHODS(state, deliveryMethods) {
              state.deliveryMethods = deliveryMethods
            },
            SET_ROLES(state, roles) {
              state.roles = roles
            },
            SET_ATTIRE_GROUP(state, attireGroup) {
              state.attireGroup = attireGroup
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
            },
            
            // fetch delivery methods 
            async allDeliveryMethods({ commit }) {
              const response = await axios.get(api + "admin/delivery_methods", {
                headers: {
                  Authorization: `Bearer ${this.state.token}`,
                }
              })
              console.log(response)
              commit("SET_ALL_DELIVERY_METHODS", response.data.data);
            },
            
            // fetch roles
            async allRoles({ commit }) {
              const response = await axios.get(api + "admin/roles", {
                headers: {
                  Authorization: `Bearer ${this.state.token}`,
                }
              })
              console.log(response)
              commit("SET_ROLES", response.data.data);
            },

            // fetch all attire groups
            async allAttireGroup({ commit }) {
              const response = await axios.get(api + "admin/groups", {
                headers: {
                  Authorization: `Bearer ${this.state.token}`,
                }
              })
              console.log(response)
              commit("SET_ATTIRE_GROUP", response.data);
            },


          },

          
          
          
          
          
          modules,
          // Enable strict mode in development to get a warning
          // when mutating state outside of a mutation.
          // https://vuex.vuejs.org/guide/strict.html
          // strict: process.env.NODE_ENV !== 'production',
        })
