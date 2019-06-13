# Vuex-Convert
### Version 1.0.2



### Description(简述)

- Simplify vuex configuration(简化Vuex配置，让你的团队更容易上手)


### Install（安装）

```base
$ npm i vuex-convert
```



### Basic usage（基本用法）

- Create store.js

```javascript
// /conf/store.js
import Vue from 'vue'
import Vuex from 'vuex'
import VuexConvert from 'vuex-convert'

const STORE = new VuexConvert({
  // State Data(状态变量)
  public:{
    base: 'Hello Vuex'
    // ...other state（其他状态）
  },
  // Modules Data(存放Modules变量)
  modules:{
    user:{
      name: 'Pi'
    }
    // ...other state（其他状态）
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






### Use the demo （使用案例）

``` Vue
// app.vue
export default {
  name: 'App',
  mounted(){
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



### Link

- [ More usage (更多用法) ](http://www.piszz.com/Vuex-Convert/docs/index.html)
- [ Source (源码) ](https://github.com/Pszz/Vuex-Convert) 
