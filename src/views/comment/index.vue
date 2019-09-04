<template>
    <div class="app">
        <el-card>
            <!-- 面包屑导航组件 -->
            <div slot="header">
                <my-bread>评论管理</my-bread>
            </div>
            <!-- 表格 评论信息 -->
            <el-table
                :data="comments"
                style="width: 100%"
            >
                <el-table-column
                    prop="date"
                    label="标题"
                    width="300"
                >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="评论状态"
                    width="108"
                >
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="总评论数"
                    width="108"
                >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="粉丝评论数"
                    width="108"
                >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="操作"
                >
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
                background
                layout="prev, pager, next"
                :total="1000">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 所有评论信息数据
      comments: []
    }
  }
}
</script>
<style lang="less" scoped>
    // 分页器样式
    .el-pagination {
        text-align: center;
        margin-top: 20px;
    }
</style>
