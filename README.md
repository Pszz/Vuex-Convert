# Vuex-Convert
### Version 1.0.1



### Description

- Simplify vuex configuration


### Link

- [ Examples ](https://github.com/Pszz/Vuex-Convert/dist)

- [ Source ](https://github.com/Pszz/Vuex-Convert) 


### Install Vuex-Convert

```base
$ npm install npm i vuex-convert
```



### Configuration Vuex-Convert

```javascript
// 1. create store.conf.js
// store.conf.js
import Vue from 'vue'
import Vuex from 'vuex'
import vuexConvert from 'vuex-convert'

const STORE = new vuexConvert({
    // Public data （Required attribute）
  public: {
    // stateName, actionsName, mutationsName, gettersName
    // base , setBase, setBase, getBase
    base: 'Hello Vuex',

    // ...Object usage 
    objBase: {
      value: {
        msg: 'I‘M Object'
      }
    },
    // Advanced usage
    objAdvanced:{
       value: {
        msg: 'I‘M Advanced usage'
      },
      // local || session || undefined
      storage: 'local', 
      // custom made Actions
      actions: function (name, { commit, state }, payout) {
        commit(name, payout || 'Ohter')
      },
      // custom made getters
      getters: function(){
        return 'return Data'
      }
    }
  },
  // Modules data （Required attribute）
	modules: {
    user: {
      name: 'Pi'
    }
  }
})
// Vue usage
Vue.use(Vuex)
export default new Vuex.Store(STORE)


// /src/main.js
import store from './store.conf.js'
new Vue({
   ...ohter,
    store  // add store
})

// ok

```

### Use Vuex-Convert
``` Vue
// app.vue
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    // Usage 1
    // <div>{{ base }}</div>
    ...mapGetters({
      base: 'getBase'
    })
  },
  mounted(){
    // Usage 2
    // get Data
    console.log(this.$store.state.base) // --> "Hello Vuex"
    console.log(this.$store.getters.getBase) // --> "Hello Vuex"
    console.log(this.$store.getters["user/getName"]) // --> "Pi"
    
    // set Data 
    this.$store.dispatch('setBase', 'Update Hello')
    console.log(this.$store.state.base) // --> "Update Hello"
  }
}
```