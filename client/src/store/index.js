import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nickname: '',
  },
  mutations: {
    SET_NICKNAME(state, nick) {
      state.nickname = nick
    },
  },
  actions: {
    setNickname({ commit }, nick) {
      commit('SET_NICKNAME', nick)
    },
  }
});
