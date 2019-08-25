<template>
    <div id="app">
        <el-select :value="value" @change="fn" placeholder="请选择">
            <el-option
            v-for="item in channelOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
            </el-option>
        </el-select>
    </div>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  created () {
    // 获取频道数据
    this.getChannelOptions()
  },
  methods: {
    async getChannelOptions () {
      const { data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    fn (value) { // 下拉菜单 change事件中 默认会有一个参数：被选中的值
      this.$emit('input', value)
    }
  }
}
</script>
<style lang="less" scoped>

</style>
