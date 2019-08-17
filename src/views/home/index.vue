<template>
    <div id="app">
        Home组件
        <el-container class="home-container">
            <el-aside width="200px">
                <div class="logo"></div>
                <el-menu
                    default-active="1"
                    background-color="#002233"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                >
                    <el-menu-item index="1">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-s-promotion"></i>
                        <span slot="title">发布文章</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-document"></i>
                        <span slot="title">内容管理</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-s-comment"></i>
                        <span slot="title">评论管理</span>
                    </el-menu-item>
                    <el-menu-item index="5">
                        <i class="el-icon-picture"></i>
                        <span slot="title">素材管理</span>
                    </el-menu-item>
                    <el-menu-item index="6">
                        <i class="el-icon-user-solid"></i>
                        <span slot="title">我的粉丝</span>
                    </el-menu-item>
                    <el-menu-item index="7">
                        <i class="el-icon-s-tools"></i>
                        <span slot="title">个人设置</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header class="header">
                    <span class="el-icon-s-fold"></span>
                    <span class="text">江苏传智播客教育科技有限公司</span>
                    <span class="user">
                        <img src="../../assets/images/avatar.jpg" alt="头像">
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link">
                                下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-lock">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </span>
                </el-header>
                <el-main>Main</el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {

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
