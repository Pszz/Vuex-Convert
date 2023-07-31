# Vuex-Convert (v1.0.2)
Just a tool to simplify Vuex.

### Install

```base
$ npm i vuex-convert
```



### Usage

- Create store.js

```javascript
// /conf/store.js
import Vue from 'vue'
import Vuex from 'vuex'
import VuexConvert from 'vuex-convert'

const STORE = new VuexConvert({
  // State Data
  public:{
    base: 'Hello Vuex'
    // ...other state
  },
  // Modules
  modules:{
    user:{
      name: 'Pi'
    }
  }
})

Vue.use(Vuex)
export default new Vuex.Store(STORE)

```

- main.js

``` javascript
import store from './conf/store.js'
  
new Vue({
    store,  // <---- add store
    // Other content
})
```






### Demo 

``` Vue
// app.vue
export default {
  name: 'App',
  mounted(){
   // Get Data
   console.log(this.$store.state.base)               // --> "Hello Vuex"
   console.log(this.$store.getters.getBase)          // --> "Hello Vuex"
   console.log(this.$store.getters["user/getName"])  // --> "Pi"
    
    // Set Data 
    this.$store.dispatch('setBase', 'Update Hello')
    console.log(this.$store.state.base)              // --> "Update Hello"
  }
}

```



### Link

- [ Docs ](http://www.piszz.com/Vuex-Convert/docs/index.html)
- [ Source ](https://github.com/Pszz/Vuex-Convert) 
