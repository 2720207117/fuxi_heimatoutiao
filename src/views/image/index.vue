<template>
    <div id="image_content" v-loading="loading">
        <el-card>
            <div slot="header">
                <my-bread>素材管理</my-bread>
            </div>
            <el-radio-group v-model="reqParams.collect" @change="search()" size="small">
                <el-radio-button type="primary" :label="false" >全部</el-radio-button>
                <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
            <el-button class="add" type="success" size="small" @click="dialogVisible = true">添加素材</el-button>

            <!-- 弹框 -->
            <el-dialog
                title="添加素材"
                :visible.sync="dialogVisible"
                width="300px">
                <el-upload
                    class="avatar-uploader"
                    action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                    :show-file-list="false"
                    :headers="headers"
                    name="image"
                    :on-success="handleSuccess"
                >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                </span>
            </el-dialog>

            <ul>
                <li v-for="item in images" :key="item.id">
                    <img :src="item.url" alt="">
                    <div class="foot" v-if="reqParams.collect===false">
                        <span @click="collect(item)" class="el-icon-star-off" :class="{red: item.is_collected}"></span>
                        <span class="el-icon-delete"></span>
                    </div>
                </li>
            </ul>
            <el-pagination
              v-if="total > reqParams.per_page"
              background
              layout="prev, pager, next"
              :page-size="reqParams.per_page"
              :current-page="reqParams.page"
              @current-change="pager"
              :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        collect: false, // 是否是收藏的图片 (false: 不是    true: 是)
        page: 1, // 当前页
        per_page: 10 // 一页显示多少条数据
      },

      // 控制弹框的显示与隐藏 默认隐藏
      dialogVisible: false,

      // 预览图片的地址
      imageUrl: null,

      // 上传的请求头
      headers: {
        Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('fuxi_hmtt')).token
      },

      // 数据加载特效
      loading: false,

      // 素材列表数据
      images: [],

      // 数据总条数
      total: 0

    }
  },

  created () {
    // 获取素材列表数据
    this.getImages()
  },

  methods: {
    // 项目初始化完成时，触发此函数 目的：获取图片素材数据
    async getImages () {
      this.loading = true
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      console.log(data)
      this.images = data.results
      this.total = data.total_count
      this.loading = false
    },

    // 当单选按钮被切换时，触发此函数
    search () {
      // 重新获取的数据显示第一页
      this.reqParams.page = 1

      // 重新获取数据 (此时collect值为true)
      this.getImages()
    },

    // 当点击分页时触发该函数
    pager (newPage) { // 默认传入参数 当前页
      this.reqParams.page = newPage // 获取当前页
      this.getImages() // 重新获取数据
    },

    // 上传素材图片成功后，触发的函数 (文件上传成功时的钩子函数)
    handleSuccess (res) { // 内有三个参数 第一个 response(响应数据)
      // 1. 预览图片
      this.imageUrl = res.data.url

      // 2. 关闭对话框 更新列表数据 (定时器：1.5秒后关闭弹框，更新数据，关闭弹框清除预览图片)
      window.setTimeout(() => {
        this.dialogVisible = false
        this.getImages()
        this.imageUrl = null
        this.$message.success('素材上传成功')
      }, 1500)
    },

    // 点击收藏按钮，触发该函数
    async collect (value) {
      // 五角星变为红色
      // 发送请求
      const { data: { data } } = await this.$http.put('user/images/' + value.id, { collect: !value.is_collected })
      console.log(data)
      // 更改收藏图标的颜色 一：将collect值取反 或 二：更该为返回数据中的collect值
      // value.is_collected = !value.is_collected
      value.is_collected = data.collect
      this.$message.success('收藏成功')
    }
  }
}
</script>
<style lang="less" scoped>
    .add {
        float: right;
    }
    ul {
        list-style: none;
        padding: 0;
        top: 0;
        overflow: hidden;
        li {
            width: 150px;
            height: 180px;
            margin-right: 50px;
            margin-bottom: 20px;
            float: left;
            border: 1px solid #ccc;
            position: relative;
            img {
                width: 100%;
                height: 100%;
                display: block;
            }
            .foot {
                width: 100%;
                height: 30px;
                line-height: 30px;
                color: #fff;
                background: rgba(0, 0, 0, 0.5);
                text-align: center;
                border-top: 1px solid #ccc;
                position: absolute;
                left: 0;
                bottom: 0;
                span {
                    margin: 0px 20px;
                    &.red {
                        color: red;
                    }
                }
            }
        }
    }
    .el-pagination {
        text-align: center;
    }

</style>
