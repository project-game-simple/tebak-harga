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
  },
  mutations: {
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
    }
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
    setRoom({ commit }, room) {
      commit('SET_ROOM', room)
    },
    setScore({ commit }, nick) {
      commit('SET_SCORE', nick)
    }
  }
});
