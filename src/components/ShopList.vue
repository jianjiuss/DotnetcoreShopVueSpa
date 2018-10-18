<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">商品列表</h1>
        </header>
        <div class="mui-content" id="content">
            <ul class="mui-table-view mui-table-view-chevron">

                <template v-for="product in products">
                    <li class="mui-table-view-cell mui-media">
                        <a class="mui-navigate-right" v-on:click="toDetail(product.id)">
                            <img class="mui-media-object mui-pull-left" v-bind:src="global.imgServerPath + product.iconImageUrl">
                            <div class="mui-media-body" style="display:inline-block;">
                                {{product.name}}
                                <p class='mui-ellipsis' style="margin-top:10px">￥{{product.price}}</p>
                            </div>
                            <div class="mui-media-body" style="display:inline-block;float:right;">
                                <p class='mui-ellipsis'>库存：{{product.store}}</p>
                            </div>
                        </a>
                    </li>
                </template>

            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            products: []
        }
    },
    props: ['id'],
    methods: {
        toDetail: function (id) {
            this.$router.push("/productdetail/" + id);
        }
    },
    mounted(){
        if (this.id !== "all") {
            this.$http.get('/api/product/category/' + this.id).then(function (res) {
                this.products = res.body;
            }, function () {
                console.log('请求失败');
            });
        }
        else {
            this.$http.get('/api/product').then(function (res) {
                this.products = res.body;
            }, function () {
                console.log('请求失败');
            });
        }
    }
}
</script>

<style scoped>

</style>
