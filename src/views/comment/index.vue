<template>
    <div class="app">
        <el-card>
            <!-- 面包屑导航组件 -->
            <div slot="header">
                <my-bread>评论管理</my-bread>
            </div>
            <!-- 表格 评论信息 -->
            <el-table :data="comments" style="width: 100%">
                <el-table-column prop="title" label="标题" width>
                </el-table-column>
                <el-table-column label="评论状态" width="108">
                    <template slot-scope="scope">
                        {{scope.row.comment_status?'正常':'关闭'}}
                    </template>
                </el-table-column>
                <el-table-column prop="total_comment_count" label="总评论数" width="108">
                </el-table-column>
                <el-table-column prop="fans_comment_count" label="粉丝评论数" width="108">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="toggleStatus(scope.row)" v-if="!scope.row.comment_status" round size="mini" type="success" class="el-icon-edit">打开评论</el-button>
                        <el-button @click="toggleStatus(scope.row)" v-else round size="mini" type="danger" class="el-icon-edit">关闭评论</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
                background
                layout="prev, pager, next"
                :page-size="reqParams.per_page"
                :current-page="reqParams.page"
                @current-change="peger"
                :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 所有评论信息数据
      comments: [],

      // 提交给后台的参数
      reqParams: {
        page: 1,
        per_page: 20,
        response_type: 'comment'
      },

      // 评论总条数
      total: 0
    }
  },

  created () {
    // 获取评论信息数据
    this.getComments()
  },

  methods: {
    async getComments () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      console.log(data)
      this.comments = data.results
      this.total = data.total_count
    },

    peger (newPage) { // newPager 为当前页
      this.reqParams.page = newPage
      this.getComments()
    },

    // 切换评论状态
    async toggleStatus (row) {
      const text1 = '您确认要打开评论吗？'
      const text2 = '您确认要关闭评论吗？'
      this.$confirm(row.comment_status ? text2 : text1, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: { data } } = await this.$http.put('comments/status?article_id=' + row.id, { allow_comment: !row.comment_status })
        // console.log(data)
        this.$message.success('修改状态成功')
        // 更新视图
        row.comment_status = data.allow_comment
      }).catch(() => {

      })
      // const data = await this.$http.put('comments/status?article_id=xxx')
    }
  }
}
</script>
<style lang="less" scoped>
    // 分页器样式
    .el-pagination {
        text-align: center;
        margin-top: 20px;
    }
</style>
