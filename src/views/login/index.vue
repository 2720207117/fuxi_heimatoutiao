<template>
    <div id="app">
        <el-card class="card">
            <img src="../../assets/images/logo_index.png" alt="logo">
            <el-form>
                <el-form-item>
                    <el-input class="nmb1" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item class="item2">
                    <el-input class="nmb2" placeholder="请输入验证码"></el-input>
                    <el-button class="btn1">发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="checked"></el-checkbox>
                    我已阅读并同意
                    <el-link type="primary">用户协议</el-link> 和
                    <el-link type="primary">隐私条款</el-link>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100%">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      checked: true
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
