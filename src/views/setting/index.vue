<template>
    <div id="app">
        <el-card>
            <div slot="header">
                <my-bread>个人设置</my-bread>
            </div>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form :model="userForm">
                            <el-form-item label="编号：">{{userForm.id}}</el-form-item>
                            <el-form-item label="手机：">{{userForm.mobile}}</el-form-item>
                            <el-form-item label="媒体名称：">
                                <el-input v-model="userForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="媒体介绍：">
                                <el-input v-model="userForm.intro" type="textarea" :rows="3"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱：">
                                <el-input v-model="userForm.email"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="success">保存信息</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <p style="text-align: center;">媒体头像</p>
                        <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                        >
                            <img v-if="userForm.photo" :src="userForm.photo" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      userForm: {
        name: null,
        id: null,
        mobile: null,
        intro: null,
        email: null,
        photo: null
      }

    }
  },
  created () {
    this.getuserData()
  },
  methods: {
    async getuserData () {
      const { data: { data } } = await this.$http.get('user/profile')
      console.log(data)
      this.userForm = data
    }
  }
}
</script>
<style lang="less" scoped>

</style>
