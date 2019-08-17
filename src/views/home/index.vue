<template>
    <div id="app">
        Home组件
        <el-container class="home-container">
            <el-aside width="200px">Aside</el-aside>
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
        background: #ccc;
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
