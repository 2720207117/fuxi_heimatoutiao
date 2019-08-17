<template>
    <div id="app">
        Home组件
        <el-container class="home-container">
            <el-aside width="200px">Aside</el-aside>
            <el-container>
                <el-header>Header</el-header>
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
        background:rebeccapurple;
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
    .el-header {
        background: rgb(57, 248, 32);
    }
    .el-main {
        background: red;
    }
</style>
