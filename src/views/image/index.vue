<template>
    <div id="image_content">
        <el-card>
            <div slot="header">
                <my-bread>素材管理</my-bread>
            </div>
            <el-radio-group v-model="radio" size="small">
                <el-radio-button type="primary" label="全部" ></el-radio-button>
                <el-radio-button label="收藏"></el-radio-button>
            </el-radio-group>
            <el-button type="success" size="small">添加素材</el-button>
            <ul>
                <li v-for="item in 10" :key="item">
                    <img src="../../assets/images/avatar.jpg" alt="">
                    <div class="foot">
                        <span class="el-icon-star-off" :class="{red: item%2}"></span>
                        <span class="el-icon-delete"></span>
                    </div>
                </li>
            </ul>
            <el-pagination background layout="prev, pager, next" :total="1000">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      radio: '全部'
    }
  }
}
</script>
<style lang="less" scoped>
    .el-button {
        float: right;
    }
    ul {
        list-style: none;
        padding: 0;
        top: 0;
        overflow: hidden;
        li {
            width: 150px;
            height: 180px;
            margin-right: 50px;
            margin-bottom: 20px;
            float: left;
            border: 1px solid #ccc;
            position: relative;
            img {
                width: 100%;
                height: 100%;
                display: block;
            }
            .foot {
                width: 100%;
                height: 30px;
                line-height: 30px;
                background: rgba(197, 242, 246, 0.5);
                text-align: center;
                border-top: 1px solid #ccc;
                position: absolute;
                left: 0;
                bottom: 0;
                span {
                    margin: 0px 20px;
                    &.red {
                        color: red;
                    }
                }
            }
        }
    }
    .el-pagination {
        text-align: center;
    }

</style>
