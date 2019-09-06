<template>
    <div id="app">----- B ----- {{data}}</div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  name: 'my-b',
  data () {
    return {
      data: ''
    }
  },
  created () {
    eventBus.$on('fnb', (data) => {
      this.data = data
    })
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>

</style>
