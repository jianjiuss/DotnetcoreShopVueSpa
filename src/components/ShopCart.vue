<template>
    <div class="mui-content">

        <div class="mui-loading" v-if="isLoading">
            <div class="mui-spinner">
            </div>
        </div>

        <template v-if="!isLoading">

            <div class="mui-card" v-if="isNeedLogin">
                <div class="mui-card-content">
                    <div style="display: inline-block;margin-top: 6px;margin-left: 12px;margin-right: 6px;">
                        <div style="height:33px;display:block;float:left;line-height:33px;">
                        登录后可同步购物车中商品
                        </div>
                    </div>
                    <button v-on:click="toLogin" class="mui-btn mui-btn-primary" style="float: right;margin-top: 6px;margin-right: 6px;">
                        登录
                    </button>
                </div>
            </div>

            <ul class="mui-table-view">
                <li class="mui-table-view-cell">
                    已选购商品
                </li>
            </ul>

            <ul class="mui-table-view">

                <template v-for="item in shopCart.shopCartItems">
                    <li class="mui-table-view-cell mui-media mui-checkbox mui-left">
                        <input name="checkbox" type="checkbox" style="padding: 30px 0;" v-model="item.isCheck" v-on:click="checkItem(item, item.isCheck)"/>
                        <div>
                            <a v-on:click="toProductDetail(item.product.id)">
                                <img class="mui-media-object mui-pull-left" v-bind:src="global.imgServerPath + item.product.iconImageUrl">
                                <div class="mui-media-body">
                                    <span v-text="item.product.name"></span>
                                    <p class='mui-ellipsis'>￥{{item.product.price}}</p>
                                </div>
                            </a>
                        </div>
                        <div class="mui-numbox" data-numbox-min='1' v-bind:data-numbox-max="item.product.store" style="float: right; height: 35px;">
                            <button class="mui-btn mui-btn-numbox-minus" type="button" >-</button>
                            <input class="mui-input-numbox" type="number" v-bind:value="item.count" v-on:change="changeItem(item, item.isCheck, $event)"/>
                            <button class="mui-btn mui-btn-numbox-plus" type="button" >+</button>
                        </div>
                        <div style="float: right;height: 35px;padding-top: 10px;">
                            <a style="padding-right: 20px;" v-on:click="removeItem(item.product.id)">删除</a>
                        </div>
                    </li>
                </template>

            </ul>
        </template>

        <div style="display:none">{{totalPrice}}</div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
    </div>
</template>

<script>
export default {
    data(){
        return {
            isLoading: true,
            isNeedLogin: true,
            shopCart: {}
        }
    },
    methods: {
        removeItem: function (id) {
            this.$http.delete("/api/shopcart/" + id).then(function (res) {
                var removeItemIndex;
                for (var i = 0; i < this.shopCart.shopCartItems.length; i++) {
                    var item = this.shopCart.shopCartItems[i];
                    if (item.product.id == id) {
                        removeItemIndex = i;
                    }
                }
                this.shopCart.shopCartItems.splice(removeItemIndex, 1);
            });
        },
        changeItem: function (item, isCheck, event) {
            item.count = event.target.value;
            this.$http.post("/api/shopcart", {
                productId: item.product.id,
                numb: item.count,
                isCheck: isCheck
            });
        },
        checkItem: function (item, isCheck) {
            this.$http.post("/api/shopcart", {
                productId: item.product.id,
                numb: item.count,
                isCheck: !isCheck
            });
        },
        toProductDetail: function(productId) {
            this.$router.push("/productdetail/" + productId);
        },
        toLogin: function(){
            this.$router.push("/login");
        }
    },
    updated: function () {
        this.mui('.mui-numbox').numbox();
    },
    mounted: function () {
        this.mui('.mui-numbox').numbox();

        this.$http.get("/api/user").then(function (res){
            this.isNeedLogin = false;
        },function(){
            this.isNeedLogin = true;
        });

        this.$http.get("/api/shopcart").then(function (res) {
            this.shopCart = res.body;
            this.isLoading = false;
        }, function () {
            console.log('请求失败');
            this.isLoading = false;
        });
    },
    computed: {
        totalPrice: {
            get: function () {
                var totalPrice = 0;
                if(this.shopCart.shopCartItems != null)
                {
                    for (var i = 0; i < this.shopCart.shopCartItems.length; i++) {
                        var item = this.shopCart.shopCartItems[i];
                        if (item.isCheck) {
                            totalPrice += (item.product.price * item.count);
                        }
                    }
                }
                this.$parent.totalPrice = totalPrice;
                return totalPrice;
            }
        }
    }
}
</script>

<style scoped>

</style>
