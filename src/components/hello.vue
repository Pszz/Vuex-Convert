
<template>
  <section class="layer-hello">
    <dl>
      <dt>HELLO.vue</dt>
      <dd>{{ base }}</dd>
    </dl>
    <input type="text" :value="base" @change="onUpdate">
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Hello',
  computed: {
    ...mapGetters({
      base: 'getBase'
    }) 
  },
  methods:{
    onUpdate(ev){
      this.$store.dispatch('setBase', ev.target.value)
    }
  }
}
</script>
