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
                    富文本
                </el-form-item>
                <el-form-item label="封面">
                    <el-radio-group v-model="articleForm.cover.type">
                        <el-radio :label="1">单图</el-radio>
                        <el-radio :label="3">三图</el-radio>
                        <el-radio :label="0">无图</el-radio>
                        <el-radio :label="-1">自动</el-radio>
                    </el-radio-group>
                    <div class="upImg">
                        <img src="../../assets/images/default.png" alt="">
                    </div>
                </el-form-item>
                <el-form-item label="频道">
                    <my-channel v-model="articleForm.channel_id"></my-channel>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">发表</el-button>
                    <el-button>草稿</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      articleForm: {
        title: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: ''
      }
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
</style>
