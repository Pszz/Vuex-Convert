import Vue from 'vue'
import Vuex from 'vuex'
import VuexConvert from 'vuex-convert'

const STORE = new VuexConvert({
  // State Data
  public:{
    base: 'Hello Vuex'
  },
  // Modules Data
  modules:{
    user:{
      name: 'Pi'
    }
  }
})

Vue.use(Vuex)
export default new Vuex.Store(STORE)