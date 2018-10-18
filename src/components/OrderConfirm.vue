<template>
<div>
    <header class="mui-bar mui-bar-nav">
        <a class="mui-action-back mui-icon mui-icon-back mui-pull-left"></a>
        <h1 class="mui-title">订单支付</h1>
    </header>
    
    <nav class="mui-bar mui-bar-tab">
        <div class="mui-table-view">
            <li class="mui-table-view-cell" style="height: 50px; line-height: 30px;">
                <span style="display: inline-block;">总价:￥{{shopCart.totalPrice}}</span>
                <p style="display: inline-block;">(含运费:￥0)</p>
                <button v-on:click="confirm()" type="button" class="mui-btn" style="background-color:#ff651b;color:#fff;font-size: 25px;width:25%;right: 0px;border-radius: 0px;border:0px">
                    <span style="font-size: 16px;">去支付</span>
                </button>
            </li>
        </div>
    </nav>
    
    <div class="mui-content">
        <ul class="mui-table-view">
            <li class="mui-table-view-cell">
                地址选择
            </li>
        </ul>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell">
                <div class="mui-table">
                    <div class="mui-table-cell mui-col-xs-10">
                        <router-link :to="{name:'UserAddresses', query: {select: true}}" class="mui-navigate-right">
                            <h5 style="display: inline-block;float:left; color: black; margin-right: 20px;">{{shipping.name}}</h5>
                            <h5 style="display: inline-block;float">{{shipping.phone}}</h5>
                            <h5 style="color:black;"><span>{{shipping.addressArea}}</span>&nbsp;&nbsp;&nbsp;<span>{{shipping.addressDetail}}</span></h5>
                        </router-link>
                    </div>
                </div>
            </li>
        </ul>
        
        <ul class="mui-table-view" style="margin-top: 20px;">
            <li class="mui-table-view-cell">
                确认商品
            </li>
        </ul>
        <ul class="mui-table-view">

            <template v-for="item in shopCart.shopCartItems">
                <li class="mui-table-view-cell">
                    <a href="javascript:;">
                        <img class="mui-media-object mui-pull-left" :src="global.imgServerPath + item.product.iconImageUrl">
                        <div class="mui-media-body" style="display: inline-block;">
                            <span>{{item.product.name}}</span>
                            <p class='mui-ellipsis'>￥{{item.product.price}}</p>
                        </div>
                        <div class="mui-media-body" style="display: inline-block;float:right;">
                            <p class="mui-ellipsis">数量：{{item.count}}</p>
                        </div>
                    </a>
                </li>
            </template>

        </ul>
        
        <ul class="mui-table-view" style="margin-top: 20px;">
            <li class="mui-table-view-cell">
                支付方式
            </li>
            <form class="mui-input-group">
                <div class="mui-input-row mui-radio mui-left">
                    <label><p>普通支付</p></label>
                    <input name="radio1" type="radio" value="0" v-model="payMethod">
                </div>
                <div class="mui-input-row mui-radio mui-left">
                    <label><p>微信支付</p></label>
                    <input name="radio1" type="radio" value="1" v-model="payMethod">
                </div>
                <div class="mui-input-row mui-radio mui-left">
                    <label><p>支付宝支付</p></label>
                    <input name="radio1" type="radio" value="2" v-model="payMethod">
                </div>
            </form>
        </ul>
        
        <div class="mui-table-view" style="margin-top: 20px;">
            <form class="mui-input-group">
                <div class="mui-input-row">
                    <label>备注</label>
                    <input type="text" class="mui-input-clear" placeholder="输入备注" v-model="remark">
                </div>
            </form>
        </div>
        
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            payMethod:0,
            remark:"",
            shopCart: {
            },
            shipping:{
            }
        }
    },
    methods:{
        confirm: function(){
            let requestJson = {
                remark : this.remark,
                shippingAddressId : this.shipping.id,
                shopCart : this.shopCart
            }

            this.$http.put("/api/order", requestJson).then(function(res){
                this.mui.toast("提交订单成功");
                this.$router.replace({name:'Pay', query: {orderId : res.body}});
            },function(res){
                this.mui.toast(res.body);
            });
        }
    },
    mounted(){
        let shipId = window.localStorage.shipId;
        if(shipId != null){
            this.$http.get("/api/useraddress/" + shipId).then(function(res){
                this.shipping = res.body;
            },function(res){
                if (res.status != 401) {
                    this.mui.toast(res.body);
                }
            });
        }else{
            this.$http.get("/api/useraddress/default").then(function(res){
                this.shipping = res.body;
            },function(res){
                if (res.status == 401) {
                this.mui.toast("请先登录，再结算。");
                this.$router.go(-1);
            }
            else{
                this.mui.toast(res.body);
            }
            });
        }
        
        this.$http.get("/api/shopcart").then(function(res){
            let shopcart = res.body

            if(shopcart.shopCartItems.length == 0){
                this.mui.toast("当前购物车为空");
                this.$router.replace({name:'ShopCart'});
            }

            let shopcartConfirm = shopcart;
            let totalPrice = 0;
            for(var i = 0; i < shopcart.shopCartItems.length; i++){
                let item = shopcart.shopCartItems[i];
                if(!item.isCheck){
                    shopcartConfirm.shopCartItems.splice(i,1);
                }
                else{
                    totalPrice += (item.product.price * item.count);
                }
            }
            shopcartConfirm.totalPrice = totalPrice;
            this.shopCart = shopcartConfirm;
        },function(res){
            if (res.status == 401) {
                this.mui.toast("请先登录");
                this.$router.go(-1);
            }
            else{
                this.mui.toast(res.body);
            }
        });
    },
    beforeRouteLeave(to, from, next){
        window.localStorage.removeItem("shipId");
        next();
    }
}
</script>

<style scoped>

</style>
