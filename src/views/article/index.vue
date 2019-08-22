<template>
    <div id="app">
        <el-card>
            <div slot="header">
                <my-bread>内容管理</my-bread>
            </div>
                <el-form :model="reqParams" size="small" label-width="80px">
                    <el-form-item label="状态：">
                        <el-radio-group v-model="reqParams.status">
                            <el-radio :label="null">全部</el-radio>
                            <el-radio :label="0">草稿</el-radio>
                            <el-radio :label="1">待审核</el-radio>
                            <el-radio :label="2">审核通过</el-radio>
                            <el-radio :label="3">审核失败</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="频道：">
                        <el-select v-model="reqParams.channel_id" placeholder="请选择">
                            <el-option
                            v-for="item in channelOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="时间：">
                        <el-date-picker
                            v-model="dateValues"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">筛选</el-button>
                    </el-form-item>
                </el-form>
        </el-card>
        <el-card>

        </el-card>
    </div>
</template>

<script>
import MyBread from '@/components/my-bread.vue' // 导入面包屑组件
export default {
  components: {
    MyBread // 注册面包屑组件
  },
  data () {
    return {
      // 提交给后台的筛选条件 传参
      // 数据为null 将不会发送该字段
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      channelOptions: [{ name: 'JAVA', id: 1 }],
      dateValues: []
    }
  }
}
</script>
<style lang="less" scoped>
    .el-card {
        margin-bottom: 20px;
    }
</style>
