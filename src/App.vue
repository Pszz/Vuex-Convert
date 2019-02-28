<template>
  <section id="app">
    <div class="one">
      <dl>
        <dt>APP.vue</dt>
        <dd>{{ base }}</dd>
      </dl>
      <c-hello></c-hello>
    </div>
    <pre>
      <!-- S 解释基础用法 -->
      <p>Basic usage（基础用法）</p>
      <code>
        export default {
          public:{
            base: 'Hello World'
          },
          modules:{}
        }
      </code>
      <hr>
      <!-- E 解释基础用法 -->

      <!-- S 解释存储方式用法 -->
      <p>Storage（存储方式）</p>
      <code>
        export default {
          public:{
            msg: {
              value: 'Hello World',
              /**
               * local = locaStorage
               * session = sessionStorage
               * default = undefined
              /**
              storage: 'local' 
            }
          },
          modules:{}
        }
      </code>
      <hr>
      <!-- E 解释存储方式用法 -->

      <!-- S 解释如何存放Object类型 -->
      <p>Object State（值为Object时，需要将内容放到value）</p>
      <code>
        export default {
          public:{
            // Bad
            // base: {}  
            // Good
            base: {
              value: 'Hello World'
            }
          },
          modules:{}
        }
      </code>
      <!-- E 解释如何存放Object类型 -->


      <!-- S 解释Actions异步提交 -->
      <p>Custom Actions （自定义Actions函数）</p>
      <code>
        import axios from 'axios'
        export default {
          public:{
            base: {
              value: 'Hello World',
              actions: function (name, { commit, state }, payout) {
                if(payout){
                  commit(name, payout)
                  return false
                }
                // Actions can contain arbitrary asynchronous operations.（异步提交）
                axios.get('xxx').then(res => {
                  commit(name, res.data)
                })
              }
            }
          },
          modules:{}
        }
      </code>
      <hr>
       <!-- E 解释Actions异步提交 -->
    </pre>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import CHello from './components/hello.vue'
export default {
  name: 'App',
  components: {
    CHello
  },
  computed: {
    ...mapGetters({
      base: 'getBase'
    })
  },
  mounted () {
    console.log(this)
  }
}
</script>
<style>
dt {
  color: #36c13b;
}
.one {
  padding: 50px 0;
  border-bottom: 1px solid #ccc;
}
p {
  margin: 0;
  line-height: 0;
  font-size: 24px;
}
code {
  margin: 0;
  background-color: #ddd;
  display: block;
  line-height: 25px;
}
</style>