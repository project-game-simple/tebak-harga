import Vue from 'vue';
import Vuex from 'vuex';
import http from '@/config/axios.js'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nickname: '',
    products: [],
  },
  mutations: {
    SET_NICKNAME(state, nick) {
      state.nickname = nick
    },
    SET_PRODUCTS(state, data) {
      state.products = data
    },
  },
  actions: {
    setNickname({ commit }, nick) {
      commit('SET_NICKNAME', nick)
    },
    getProducts({ commit }) {
      http.get('/')
      .then(data => {
        commit('SET_PRODUCTS', data)
      })
      .catch(err => {
        throw(err)
      })
    }
  }
});
