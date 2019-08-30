<template>
    <div id="app">
        <div class="upImg" @click="openDialog">
            <img src="../assets/images/default.png" alt="">
        </div>
        <!-- 对话框 -->
        <el-dialog :visible.sync="dialogVisible" width="700px" height="500px" center>
            <!-- 内容 -->
            <el-tabs v-model="activeName" type="card" v-loading="loading">
                <el-tab-pane label="素材库" name="images">
                    <!-- 单选按钮 -->
                    <div>
                        <el-radio-group @change="toggleImage" v-model="reqParams.collect" size="small">
                            <el-radio-button :label="false">全部</el-radio-button>
                            <el-radio-button :label="true">收藏</el-radio-button>
                        </el-radio-group>
                    </div>
                    <!-- 素材列表 -->
                    <div class="imgBox" v-for="item in images" :key="item.id">
                        <img :src="item.url" alt="">
                    </div>
                    <!-- 分页器 -->
                    <el-pagination
                        v-if="total_count > reqParams.per_page"
                        background
                        layout="prev, pager, next"
                        :total="total_count"
                        :page-size="reqParams.per_page"
                        :current-page="reqParams.page"
                        @current-change="peger"
                        >
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane label="上传图片" name="upimgs">
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                    >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-tab-pane>
            </el-tabs>
            <!-- 按钮 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
export default {
  name: 'my-image',
  data () {
    return {
      // 加载中
      loading: false,

      // 控制对话框显示/隐藏
      dialogVisible: false,

      // 控制选项卡选中谁
      activeName: 'images',

      // 请求素材列表的参数
      reqParams: {
        collect: false,
        per_page: 8, // 每页显示多少条数据
        page: 1 // 当前页
      },

      total_count: '', // 数据总条数

      imageUrl: null, // 上传图片预览地址

      images: [] // 图片素材数据
    }
  },
  methods: {
    // 当点击添加素材图片按钮时，触发此函数
    openDialog () {
      // 打开对话框
      this.dialogVisible = true

      // 获取图片素材数据
      this.getImages()
    },

    // 获取图片素材数据 (当点击添加素材图片按钮时，会触发此函数)
    async getImages () {
      this.loading = true
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      console.log(data)
      this.images = data.results // 获取素材图片数据
      this.total_count = data.total_count // 获取数据总条数
      this.loading = false
    },

    // 当 当前页改变(点击分页按钮时)，触发此函数
    peger (value) { // 自动传入一个参数 接收当前页
      this.reqParams.page = value // 更新当前页
      this.getImages() // 重新获取数据
    },

    // 当单选按钮值发生改变时，触发此函数
    toggleImage () {
      // 获取收藏的素材图片数据
      this.reqParams.page = 1 // 显示第一页的请求数据
      this.getImages()
    }
  }
}
</script>
<style lang="less" scoped>
    .upImg {
        width: 150px;
        height: 150px;
        border: 1px dashed #ccc;
        margin-top: 10px;
        img {
            width: 100%;
            height: 100%;
            display: block;
        }
    }
    .imgBox {
        width: 150px;
        height: 120px;
        background: #ccc;
        margin: 10px 10px 0 0;
        border: 1px dashed #666;
        display: inline-block;
        img {
            width: 100%;
            height: 100%;
            display: block;

            // 图片属性，让图片按照等比例缩显示在容器内
            object-fit: contain;
        }
    }
    .el-pagination {
        margin-top: 20px;
        text-align: center;
    }
</style>
