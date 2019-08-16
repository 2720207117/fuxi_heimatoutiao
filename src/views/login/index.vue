<template>
    <div id="app">
        <el-card class="card">
            <img src="../../assets/images/logo_index.png" alt="logo">

        </el-card>
    </div>
</template>

<script>
export default {

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
    }
</style>
