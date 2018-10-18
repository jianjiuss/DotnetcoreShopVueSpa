<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-back mui-pull-left"></a>
            <h1 class="mui-title">用户收藏</h1>
        </header>

        <div class="mui-content" id="content">
            <div class="title">
                用户商品收藏夹
            </div>
            <ul class="mui-table-view">

                <template v-for="product in products">

                    <li class="mui-table-view-cell mui-media">
                        <a style="display: inline-block" class="mui-col-xs-11" v-on:click="toProductDetail(product.id)">
                            <img class="mui-media-object mui-pull-left" src="images/shuijiao.jpg" v-bind:src="global.imgServerPath + product.iconImageUrl">
                            <div class="mui-media-body">
                                {{product.name}}
                                <p class='mui-ellipsis'>￥{{product.price}}</p>
                            </div>
                        </a>
                        <div style="display: inline-block;float:right;" class="mui-col-xs-1">
                            <a style="display: block; margin:8px 0px;" v-on:click="remove(product.id)"><span class="mui-icon mui-icon-trash"></span></a>
                        </div>
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
            products: [
            ]
        }
    },
    methods: {
        toProductDetail: function (id) {
            this.$router.push({name: 'ProductDetail', params: {id}});
        },
        remove: function (id) {
            this.$http.delete("/api/usercollection/" + id).then(function (res) {
                var removeItemIndex;
                for (var i = 0; i < this.products.length; i++) {
                    var item = this.products[i];
                    if (item.id == id) {
                        removeItemIndex = i;
                    }
                }
                this.products.splice(removeItemIndex, 1);
                this.mui.toast("移除成功");
            }, function (res) {
                this.mui.toast(res.body);
                var removeItemIndex;
                for (var i = 0; i < this.products.length; i++) {
                    var item = this.products[i];
                    if (item.id == id) {
                        removeItemIndex = i;
                    }
                }
                this.products.splice(removeItemIndex, 1);
            });
        }
    },
    mounted(){
        this.$http.get("/api/usercollection").then(function (res) {
            this.products = res.body;
        }, function (res) {

        });
    }
}
</script>

<style scoped>
    .title {
        margin: 20px 15px 10px;
        color: #6d6d72;
        font-size: 15px;
    }
</style>
