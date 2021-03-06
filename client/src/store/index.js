import Vue from 'vue';
import Vuex from 'vuex';
import http from '@/config/axios.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: [],
    nickname: '',
    products: [],
    category: '',
    rooms: [],
    currentProduct: [],
    tampil: false,
  },
  mutations: {
    SET_TAMPIL_TRUE(state) {
      state.tampil = true;
    },
    SET_NICKNAME(state, nick) {
      state.players.push({nickname: nick, score: 0}) 
      state.nickname = nick
    },
    SET_PRODUCTS(state, data) {
      state.products = data
    },
    SET_CATEGORY(state, category) {
      state.category = category
    },
    SET_ROOM(state, room) {
      state.rooms = room
    },
    SET_SCORE(state, nick) {
      state.players.forEach(el => {
        if (el.nickname == nick) {
          el.score += 20
        }
      })
    },
    SET_CPRODUCT(state, data) {
      state.currentProduct = data;
    },
  },
  actions: {
    setTampilTrue({ commit }) {
      commit('SET_TAMPIL_TRUE');
    },
    setNickname({ commit }, nick) {
      commit('SET_NICKNAME', nick)
    },
    async getProducts({ commit }) {
      await http.get('/')
      .then(({ data }) => {
        commit('SET_PRODUCTS', data)
        return;
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
    setRoom({ commit }, room) {
      commit('SET_ROOM', room)
    },
    setScore({ commit }, nick) {
      commit('SET_SCORE', nick)
    },
    setCurrentProduct({ commit }, data) {
      commit('SET_CPRODUCT', data);
    }
  }
});
