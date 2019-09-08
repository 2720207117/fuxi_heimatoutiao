<template>
    <div id="app">
        <el-card>
            <div slot="header">
                <my-bread>个人设置</my-bread>
            </div>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form :model="userForm" label-width="120px">
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
                                <el-button @click="updateUser" type="success">保存信息</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <p style="text-align: center;">媒体头像</p>
                        <el-upload
                            class="avatar-uploader"
                            action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
                            :show-file-list="false"
                            :http-request="Upreq"
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
import eventBus from '@/eventBus'
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
      },
      headers: {
        Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('fuxi_hmtt')).token
      }
    }
  },
  created () {
    this.getuserData() // 获取用户资料
  },
  methods: {
    // 初始化个人设置页面时，触发此函数
    async getuserData () {
      const { data: { data } } = await this.$http.get('user/profile')
      //   console.log(data)
      this.userForm = data
    },

    // 当点击保存信息按钮时，触发此函数
    async updateUser () {
      const { data: { data } } = await this.$http.patch('user/profile', {
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      this.$message.success('修改用户信息成功')

      // 让头部的用户名称和返回的用户名称同步
      // 让setting组件的数据 传递给home组件 (eventBus)
      eventBus.$emit('updateUserName', data.name)

      // 问题：保存用户信息成功后 刷新页面 头部的用户信息又改回去了
      // 原因：用户信息保存在了sessionStorage 里 没有更新sessionStorage
      // 解决：需要把sessionStorage里的用户信息全部取出 再修改其中的name信息(不能直接修改，需要保存住token信息，否则页面会退出登录)
      const userData = JSON.parse(window.sessionStorage.getItem('fuxi_hmtt')) // 获取sessionStorage里的用户信息
      //   console.log(userData)
      userData.name = data.name // 修改用户用户信息里的用户名称

      window.sessionStorage.setItem('fuxi_hmtt', JSON.stringify(userData)) // 更新sessionStorage
    },

    Upreq (data) {
      // 把文件数据放在FormData中
      const formData = new FormData()
      formData.append('photo', data.file)
      this.$http.patch('user/photo', formData).then(res => {
        // console.log(res)
        this.userForm.photo = res.data.data.photo // 显示要更新的头像

        // 更新头部头像
        eventBus.$emit('updatePhoto', res.data.data.photo)

        // 更新sessionStorarge
        const userData = JSON.parse(window.sessionStorage.getItem('fuxi_hmtt')) // 获取sessionStorage里的用户信息
        // console.log(userData)
        userData.photo = this.userForm.photo // 修改用户用户信息里的头像地址
        window.sessionStorage.setItem('fuxi_hmtt', JSON.stringify(userData))
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
