<template>
    <div id="app">
        <div class="upImg" @click="openDialog">
            <!-- 父组件有数据  没有数据使用默认图片 -->
            <img :src="value || defaultImage" alt="">
        </div>
        <!-- 对话框 -->
        <el-dialog :visible.sync="dialogVisible" width="700px" height="500px" center>
            <!-- 内容 -->
            <!-- v-model="activeName" 是选中了tab选项卡 name属性的值 -->
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
                    <div class="imgBox" :class="{selected:url === item.url}" @click="selected(item.url)" v-for="item in images" :key="item.id">
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
                        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                        :show-file-list="false"
                        :headers="headers"
                        name="image"
                        :on-success="handleSuccess"
                    >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-tab-pane>
            </el-tabs>
            <!-- 按钮 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmImage">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import defaultImage from '../assets/images/default.png' // 导入本地图片资源地址
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      // 设置默认图片
      // 项目是webpack打包，如果本地的资源地址，存储在数据中，是不会打包到项目中。
      // 主动导入图片资源，此时图片就是一项数据 (base64的数据：字符串数据格式)
      // value: defaultImage,

      defaultImage,

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

      images: [], // 图片素材数据

      url: null, // 选中的图片url (url也具有为一性)

      // 上传图片的请求头
      headers: {
        Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('fuxi_hmtt')).token
      }
    }
  },
  methods: {
    // 当点击添加素材图片按钮时，触发此函数
    openDialog () {
      // 打开对话框
      this.dialogVisible = true

      // 把上一次数据清空
      this.imageUrl = null
      this.url = null

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
    },

    // 选中当前点击的图片
    selected (url) {
      // 给当前点击的图片，加上一个类 selected
      // :class="{ selected: 条件}"
      // 条件：根据当前图片的url 去匹配遍历时的url 一致添加 不一致不添加
      this.url = url
    },

    // 上传素材图片成功后，触发的函数 (文件上传成功时的钩子函数)
    handleSuccess (res) { // 内有三个参数 第一个 response(响应数据)
      // 预览图片
      this.imageUrl = res.data.url
    },

    // 确认图片 (对话框内，点击确按钮时，会触发此函数)
    confirmImage () {
      if (this.activeName === 'images') { // 如果选项卡选中的是素材库
        // 使用 url
        if (!this.url) return this.$message.info('请选中封面图')// 严谨判断 当没有数据时 直接return
        // this.value = this.url
        // 通知父组件，数据要发生改变 (传数据给父组件)
        this.$emit('input', this.url)
      } else {
        // 使用imageUrl
        if (!this.imageUrl) return this.$message.info('请上传封面图') // 严谨判断 当没有获取到imageUrl时，直接return
        // this.value = this.imageUrl
        // 通知父组件数据要发生改变
        this.$emit('input', this.imageUrl)
      }
      this.dialogVisible = false
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
        float: left;
        margin-right: 10px;
        img {
            width: 100%;
            height: 100%;
            display: block;
        }
    }
    .imgBox {
        width: 150px;
        height: 120px;
        margin: 10px 10px 0 0;
        display: inline-block;
        position: relative;
        // & 连接符 .imgBox.selected (使用交集选择器时，避免产生空格)
        &.selected {
            &::before {
                // 一个和图片大小一样的容器 有半透明背景 打钩图标
                content: "";
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                background: rgba(0, 0, 0, .5) url('../assets/images/selected.png') no-repeat center / 60px 60px;
            }
        }
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
