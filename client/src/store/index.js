import Vue from 'vue';
import Vuex from 'vuex';
import http from '@/config/axios.js'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nickname: '',
    products: [],
    category: ''
  },
  mutations: {
    SET_NICKNAME(state, nick) {
      state.nickname = nick
    },
    SET_PRODUCTS(state, data) {
      state.products = data
    },
    SET_CATEGORY(state, category) {
      state.category = category
    },
  },
  actions: {
    setNickname({ commit }, nick) {
      commit('SET_NICKNAME', nick)
    },
    getProducts({ commit }) {
      http.get('/')
      .then(({ data }) => {
        commit('SET_PRODUCTS', data)
      })
      .catch(err => {
        throw(err)
      })
    },
    setCategory({ commit }, category) {
      if(localStorage.category) {
        commit('SET_CATEGORY', localStorage.category)
      } else {
        commit('SET_CATEGORY', category)
      }
    },
  }
});
