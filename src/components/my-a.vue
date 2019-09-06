<template>
    <div id="app">----- A ----- <button @click="fn">传数据给B</button></div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  name: 'my-a',

  // 在A组件内声明数据
  data () {
    return {
      name: '我是兄弟A组件传来的数据'
    }
  },
  created () {

  },
  methods: {
    fn () {
      eventBus.$emit('fnb', this.name)
    }
  }
}
</script>
<style lang="less" scoped>

</style>
