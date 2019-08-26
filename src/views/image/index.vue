<template>
    <div id="image_content">
        <el-card>
            <div slot="header">
                <my-bread>素材管理</my-bread>
            </div>
            <el-radio-group v-model="reqParams.collect" @change="search()" size="small">
                <el-radio-button type="primary" :label="false" >全部</el-radio-button>
                <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
            <el-button type="success" size="small">添加素材</el-button>
            <ul>
                <li v-for="item in images" :key="item.id">
                    <img :src="item.url" alt="">
                    <div class="foot" v-if="reqParams.collect===false">
                        <span class="el-icon-star-off" :class="{red: item.is_collected}"></span>
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
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },

      // 素材列表数据
      images: []

    }
  },

  created () {
    // 获取素材列表数据
    this.getImages()
  },

  methods: {
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      console.log(data)
      this.images = data.results
    },

    search () {
      // 重新获取的数据显示第一页
      this.reqParams.page = 1

      // 重新获取数据 (此时collect值为true)
      this.getImages()
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
                color: #fff;
                background: rgba(0, 0, 0, 0.5);
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
