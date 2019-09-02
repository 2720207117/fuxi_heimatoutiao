<template>
    <div id="app">
        <el-card>
            <div slot="header">
                <my-bread>发布文章</my-bread>
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
                <el-form-item>
                    <el-button type="primary" @click="publish(false)">发表</el-button>
                    <el-button @click="publish(true)">草稿</el-button>
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
    }
  }
}
</script>
<style lang="less" scoped>

</style>
