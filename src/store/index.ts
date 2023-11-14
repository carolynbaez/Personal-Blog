import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    type: null,
    role: null,
    token: localStorage.token, 
    errorLogin: false,
    userId: JSON.parse(localStorage.getItem("UserId")!) ,
    comments: null
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
