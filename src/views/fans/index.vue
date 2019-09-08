<template>
    <div id="app">
        <el-card>
            <div slot="header">
                <my-bread>粉丝管理</my-bread>
            </div>
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="粉丝列表" name="list">
                    <img style="width: 120px" src="../../assets/images/avatar.jpg" alt="">
                </el-tab-pane>
                <el-tab-pane label="粉丝画像" name="charts">粉丝画像</el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'list'
    }
  }
}
</script>
<style lang="less" scoped>

</style>
