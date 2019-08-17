<template>
    <div id="app">
        <el-card class="card">
            <img src="../../assets/images/logo_index.png" alt="logo">
            <el-form :model="LoginForm" :rules="LoginRules" ref="LoginForm" status-icon>
                <el-form-item prop="mobile">
                    <el-input class="nmb1" v-model="LoginForm.mobile" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item class="item2" prop="code">
                    <el-input class="nmb2" v-model="LoginForm.code" placeholder="请输入验证码"></el-input>
                    <el-button class="btn1">发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="checked"></el-checkbox>
                    我已阅读并同意
                    <el-link type="primary">用户协议</el-link> 和
                    <el-link type="primary">隐私条款</el-link>
                </el-form-item>
                <el-form-item>
                    <el-button @click="login()" type="primary" style="width: 100%">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    const checkmobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号码格式不正确！'))
      }
    }
    return {
      checked: true,
      LoginForm: {
        mobile: '13439211668',
        code: '246810'
      },
      // 表单的校验规则对象
      LoginRules: {
        mobile: [
          { required: true, message: '请输入手机号！', trigger: 'blur' },
          { validator: checkmobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码！', trigger: 'blur' },
          { len: 6, message: '验证码必须为6位！', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.LoginForm.validate((valid) => {
        if (valid) {
          // 校验成功，进行登录
          this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.LoginForm).then(res => {
            // res是响应对象，包含相应数据
            console.log(res)
            const UserData = res.data
            console.log(UserData)
            // 登录成功后做什么事情？
            // 1. 跳转到首页
            // 2. 保持登录状态
            this.$router.push('/') // 跳转到首页
          }).catch(error => {
            this.$message.error('手机号或验证码输入错误！')
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
    #app {
        background: url('../../assets/images/login_bg.jpg') no-repeat center / cover;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }

    .card {
        width: 420px;
        height: 360px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        img {
            display: block;
            width: 240px;
            margin: 0 auto;
        }

        .nmb1 {
            margin-top: 30px;
        }

        .nmb2 {
            width: 250px;
        }

        .btn1 {
            float: right;
        }

        .el-checkbox {
            margin-right: 8px;
        }

        .el-link {
            vertical-align: top;
        }
    }
</style>
