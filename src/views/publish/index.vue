<template>
    <div id="app">
        <el-card>
            <div slot="header">
                <my-bread>{{articleId ? '修改文章' : '发布文章'}}</my-bread>
            </div>
            <el-form :model="articleForm" label-width="100px">
                <el-form-item label="标题">
                    <el-input style="width: 400px" v-model="articleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
                </el-form-item>
                <el-form-item label="封面">
                    <el-radio-group v-model="articleForm.cover.type" @change="changeType">
                        <el-radio :label="1">单图</el-radio>
                        <el-radio :label="3">三图</el-radio>
                        <el-radio :label="0">无图</el-radio>
                        <el-radio :label="-1">自动</el-radio>
                    </el-radio-group>
                    <div v-if="articleForm.cover.type === 1">
                      <my-image v-model="articleForm.cover.images[0]"></my-image>
                    </div>
                    <div v-if="articleForm.cover.type === 3">
                      <my-image v-model="articleForm.cover.images[0]"></my-image>
                      <my-image v-model="articleForm.cover.images[1]"></my-image>
                      <my-image v-model="articleForm.cover.images[2]"></my-image>
                    </div>
                </el-form-item>
                <el-form-item label="频道">
                    <my-channel v-model="articleForm.channel_id"></my-channel>
                </el-form-item>
                <!-- 如果没有获取到文章id 说明是发表文章 -->
                <el-form-item v-if="!articleId">
                    <el-button type="primary" @click="publish(false)">发表</el-button>
                    <el-button @click="publish(true)">草稿</el-button>
                </el-form-item>
                <!-- 反之 获取到文章id 则为修改文章 -->
                <el-form-item v-else>
                    <el-button type="success" @click="edit(false)">修改</el-button>
                    <el-button @click="edit(true)">草稿</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: { quillEditor },
  data () {
    return {
      // 文章Id
      articleId: null,

      // 请求体数据
      articleForm: {
        title: '',
        content: '',
        cover: {
          type: 1,

          // 单张图 三张图
          images: []
        },
        channel_id: ''
      },
      // 富文本编辑器配置对象
      editorOption: {
        placeholder: '', // 清空默认占位符
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }]
          ]
        }
      }
    }
  },
  created () {
    // 问题：在文章编辑的时候切换到发布，组件不更新 (原因：路由没有发生改变，只是传参改变了，没有去更新组件)
    // 出现：只在编辑文章切换到发布的时候才会出现
    // 解决：此处参数是$route对象中的query对象中的id，使用侦听器监听$route属性变化，更新组件
    this.articleId = this.$route.query.id

    // 获取文章数据
    // if (this.articleId) { // 严谨判断 当获取到了articleId(文章id)时，再获取指定文章数据
    //   this.getArticle(this.articleId)
    // }

    // 或者
    this.articleId && this.getArticle(this.articleId)
  },
  watch: {
    $route () {
      // 1. 把编辑状态改成发布状态(表单内容重置，把ID重置)
      this.articleId = null

      // 不能重置为null或{} 因为null.title会报错  {}.type报错
      this.articleForm = {
        title: '',
        content: '',
        cover: {
          type: 1,

          // 单张图 三张图
          images: []
        },
        channel_id: ''
      }
    }
  },
  methods: {
    changeType () {
      // 重置图片数组
      this.articleForm.cover.images = []
    },

    async publish (draft) {
      // ... 省略了校验
      // draft 发表为: false  草稿为：true
      // this.$http.post({data: 请求体数据，params: query数据(地址栏数据)})
      await this.$http.post('articles?draft=' + draft, this.articleForm)
      this.$message.success(draft ? '存入草稿成功' : '文章发表成功')
      this.$router.push('/article')
    },

    async edit (draft) {
      await this.$http.put(`articles/${this.articleId}?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '修改存入草稿成功' : '修改文章成功')
      this.$router.push('/article')
    },

    async getArticle (id) {
      const { data: { data } } = await this.$http.get('/articles/' + id)
      this.articleForm = data
    }
  }

}
</script>
<style lang="less" scoped>

</style>
