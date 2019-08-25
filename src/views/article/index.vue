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
                            value-format="yyyy-MM-dd"
                            @change="changeDate"
                            v-model="dateValues"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search()">筛选</el-button>
                    </el-form-item>
                </el-form>
        </el-card>
        <el-card>
            <div slot="header">
                根据筛选条件共查询到 <b>{{total_count}}</b> 条结果：
            </div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="封面">
                    <template slot-scope="scope">
                        <el-image :src="scope.row.cover.images[0]" alt="" lazy style="width: 100px; height: 75px">
                            <div slot="error" class="image-slot">
                                <img src="../../assets/images/error.gif" alt="" width="100px" height="75px">
                            </div>
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column label="标题" prop="title">
                    <!-- <template slot-scope="scope">
                        {{scope.row.id}}  此处目的：显示文章id 被转换的是否准确，以便用于删除文章数据
                    </template> -->
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status == 0" type="info">草稿</el-tag>
                        <el-tag v-if="scope.row.status == 1">待审核</el-tag>
                        <el-tag v-if="scope.row.status == 2" type="success">审核通过</el-tag>
                        <el-tag v-if="scope.row.status == 3" type="warning">审核失败</el-tag>
                        <el-tag v-if="scope.row.status == 4" type="danger">已删除</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="发布时间" prop="pubdate">
                </el-table-column>
                <el-table-column label="操作" width="120px">
                    <template slot-scope="scope">
                      <el-button class="el-icon-edit" plain circle type="primary"></el-button>
                    <el-button @click="deleteValues(scope.row.id)" class="el-icon-delete" plain circle type="danger"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <!-- :@current-change 页码切换时触发的事件；:current-page 当前页；
                 :page-size 一页显示多少条数据；:total 数据总条数 -->
            <el-pagination
                background
                layout="prev, pager, next"
                :total="this.total_count"
                :page-size="reqParams.per_page"
                :current-page="reqParams.page"
                @current-change="changePager">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
// import MyBread from '@/components/my-bread.vue' // 导入面包屑组件    注册了插件不需导入
export default {
//   components: {  // 注册了插件不需注册组件
//     MyBread // 注册面包屑组件
//   },
  data () {
    return {
      // 提交给后台的筛选条件 传参
      // 数据为null 将不会发送该字段
      reqParams: {
        page: 1, // 当前页
        per_page: 20, // 每页显示数据条数
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      channelOptions: [],
      dateValues: [],
      tableData: [],
      total_count: 0 // 定义数据总条数
    }
  },
  created () {
    // 获取频道数据
    this.getChannelOptions()

    // 获取文章列表数据
    this.gettableData()
  },
  methods: {
    // 获取频道数据的方法
    async getChannelOptions () {
      const { data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },

    // 获取文章列表数据方法
    async gettableData () {
      // post传参   axios.post('url', {参数对象})
      // get传参    axios.get('url', {params: {参数对象}})
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      console.log(data)
      this.total_count = data.total_count // 获取数据总条数
      this.tableData = data.results // 获取文章列表
      this.per_page = data.per_page // 获取每页数据条数
    },

    // 用户确认选定时间后触发该函数
    changeDate (values) { // 默认传入values数据 与 dateValues保持一致
    // 给begin，end赋值即可
      this.reqParams.begin_pubdate = values[0]
      this.reqParams.end_pubdate = values[1]
    },

    // 点击搜索按钮触发改函数 搜索
    search () {
      // 重新获取数据即可
      this.reqParams.page = 1 // 获取数据时，当前页为第一页
      this.gettableData()
    },

    // 页码切换时触发该函数
    changePager (value) { // value 接收当前点击的页码
      this.reqParams.page = value // 更新提交给后台的参数
      this.gettableData() // 重新获取数据

      // --> 去修改筛选功能 筛选时，数据及页码再返回到第一页
    },

    // 点击删除时，触发该函数
    deleteValues (id) {
      // 发送删除数据请求
      this.$confirm('此操作将永久删除该文章, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确认 (发送删除文章数据请求)
        await this.$http.delete(`articles/${id}`)
        this.gettableData()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        // 点击取消
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .el-card {
        margin-bottom: 20px;
        .el-pagination {
            text-align: center;
            margin-top: 30px;
        }
    }
</style>
