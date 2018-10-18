<template>
    <div>
        <header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-back mui-pull-left"></a>
		    <h1 class="mui-title">商品搜索</h1>
		</header>
		
		<div class="mui-content">
            <div style="padding: 10px;background: white;">
                <div class="mui-input-row mui-search">
                    <input type="search" class="mui-input-clear" placeholder="请输入商品名称" @keyup.enter="search" />
                </div>
            </div>

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
            products:[]
        }
    },
    methods:{
        toDetail: function (id) {
            this.$router.push("/productdetail/" + id);
        },
        search(e){
            let str = e.srcElement.value;
            this.$http.get("/api/product/name?keyword=" + str).then(function(res){
                this.products = res.body;
                if(this.products.length == 0){
                    this.mui.toast("没有该商品");
                }
            },function(res){

            });
        }
    },
    mounted(){
        this.mui(".mui-input-row input").input();
    }
}
</script>
