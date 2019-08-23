<template>
    <div id="app">
        <el-container class="home-container">
            <!-- :width="isCollapse?'60px' : '200px'"   此处运用三元表达式 当isCollapse为true时值为60px, 为false时值为200px -->
            <el-aside :width="isCollapse?'60px' : '200px'">
                <!-- :class="{想要显示的类名:data中的布尔值}"   可以和写死的class同时使用 -->
                <div class="logo" :class="{close:isCollapse}"></div>
                <el-menu
                    :default-active="$route.path"
                    background-color="#002233"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    :collapse="isCollapse"
                    :collapse-transition="false"
                    router
                >
                    <el-menu-item index="/">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-menu-item index="/publish">
                        <i class="el-icon-s-promotion"></i>
                        <span slot="title">发布文章</span>
                    </el-menu-item>
                    <el-menu-item index="/article">
                        <i class="el-icon-document"></i>
                        <span slot="title">内容管理</span>
                    </el-menu-item>
                    <el-menu-item index="/comment">
                        <i class="el-icon-s-comment"></i>
                        <span slot="title">评论管理</span>
                    </el-menu-item>
                    <el-menu-item index="/image">
                        <i class="el-icon-picture"></i>
                        <span slot="title">素材管理</span>
                    </el-menu-item>
                    <el-menu-item index="/fans">
                        <i class="el-icon-user-solid"></i>
                        <span slot="title">我的粉丝</span>
                    </el-menu-item>
                    <el-menu-item index="/setting">
                        <i class="el-icon-s-tools"></i>
                        <span slot="title">个人设置</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header class="header">
                    <span class="el-icon-s-fold" @click="Switchmenu"></span>
                    <span class="text">江苏传智播客教育科技有限公司</span>
                    <span class="user">
                        <img :src="img_url" alt="头像">{{name}}
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link">
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item icon="el-icon-setting" @click.native="setting()">个人设置</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-lock" @click.native="logout()">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </span>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false,
      img_url: '',
      name: ''
    }
  },
  methods: {
    Switchmenu () {
      this.isCollapse = !this.isCollapse
    },

    // el-dropdown-item 不是原生dom,不一定支持原生的绑定事件
    // 如果想给组件(非原生)绑定事件，需要使用一个事件修饰符 native
    // @click.native    触发原生dom事件
    setting () { // 跳转到个人设置
      this.$router.push('/setting')
    },
    logout () {
      window.sessionStorage.removeItem('fuxi_hmtt') // 清除token信息
      //   window.location.reload() // 清除token信息后 刷新页面
      this.$router.push('/login')
    }
  },
  created () { // 组件出事化成功的时候 (获取用于信息)
    const res = JSON.parse(window.sessionStorage.getItem('fuxi_hmtt'))
    // console.log(res)
    this.name = res.name
    this.img_url = res.photo
  }

}
</script>
<style lang="less" scoped>
    .home-container {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
    .el-aside {
        height: 100%;
        background: #002233;
        .logo {
            text-align: center;
            height: 60px;
            background: url('../../assets/images/logo_admin.png') no-repeat center / 140px auto;
        }
        .close {
            background: url('../../assets/images/logo_admin_01.png') no-repeat center;
            background-size: 36px;
        }
        .el-menu {
            border-right: none;
        }
    }
    .header {
        border-bottom: 1px solid #ccc;
        box-shadow: 0px 0px 5px 0px rgb(179, 177, 177);
        line-height: 60px;
        .el-icon-s-fold {
            font-size: 26px;
            vertical-align: middle;
            margin-right: 10px;
        }
        .text {
            vertical-align: middle;
        }
        .user {
            float: right;
            img {
                vertical-align: middle;
                width: 30px;
                margin-right: 6px;
            }
        }
    }
</style>
