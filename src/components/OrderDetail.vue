<template>
<div>
    <header class="mui-bar mui-bar-nav">
        <a class="mui-action-back mui-icon mui-icon-back mui-pull-left"></a>
        <h1 class="mui-title">订单详情</h1>
    </header>
    
    <nav class="mui-bar mui-bar-tab">
        <div class="mui-table-view">
            <li class="mui-table-view-cell" style="height: 50px; line-height: 30px;">
                <span style="display: inline-block;">总价:￥{{order.totalPrice}}</span>
                <p style="display: inline-block;">(含运费:￥0)</p>
                <button v-if="order.status == 0" v-on:click="toPay()" type="button" class="mui-btn" style="background-color:#ff651b;color:#fff;font-size: 25px;width:25%;right: 0px;border-radius: 0px;border:0px">
                    <span style="font-size: 16px;">去支付</span>
                </button>
                <button v-if="order.status == 1" disabled type="button" class="mui-btn" style="background-color:#ff651b;color:#fff;font-size: 25px;width:25%;right: 0px;border-radius: 0px;border:0px">
                    <span style="font-size: 16px;">待发货</span>
                </button>
                <button v-if="order.status == 2" v-on:click="confirm()" type="button" class="mui-btn" style="background-color:#ff651b;color:#fff;font-size: 25px;width:25%;right: 0px;border-radius: 0px;border:0px">
                    <span style="font-size: 16px;">确认收货</span>
                </button>
                <button v-if="order.status == 3" disabled type="button" class="mui-btn" style="background-color:#ff651b;color:#fff;font-size: 25px;width:25%;right: 0px;border-radius: 0px;border:0px">
                    <span style="font-size: 16px;">已完成</span>
                </button>
            </li>
        </div>
    </nav>

    <div class="mui-content">
        <ul class="mui-table-view">
            <li class="mui-table-view-cell">
                配送地址
            </li>
        </ul>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell">
                <div class="mui-table">
                    <div class="mui-table-cell mui-col-xs-10">
                        <template v-if="order.shippingAddress != null">
                        <h5 style="display: inline-block;float:left; color: black; margin-right: 20px;">{{order.shippingAddress.name}}</h5>
                        <h5 style="display: inline-block;float">{{order.shippingAddress.phone}}</h5>
                        <h5 style="color:black;"><span>{{order.shippingAddress.addressArea}}</span>&nbsp;&nbsp;&nbsp;<span>{{order.shippingAddress.addressDetail}}</span></h5>
                        </template>
                    </div>
                </div>
            </li>
        </ul>
        
        <ul class="mui-table-view" style="margin-top: 20px;">
            <li class="mui-table-view-cell">
                购买商品
            </li>
        </ul>
        <ul class="mui-table-view">

            <template v-for="item in order.orderItems">
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
                    <input name="radio1" type="radio" value="0" v-model="payMethod" disabled>
                </div>
                <div class="mui-input-row mui-radio mui-left">
                    <label><p>微信支付</p></label>
                    <input name="radio1" type="radio" value="1" v-model="payMethod" disabled>
                </div>
                <div class="mui-input-row mui-radio mui-left">
                    <label><p>支付宝支付</p></label>
                    <input name="radio1" type="radio" value="2" v-model="payMethod" disabled>
                </div>
            </form>
        </ul>
        
        <div class="mui-table-view" style="margin-top: 20px;">
            <form class="mui-input-group">
                <div class="mui-input-row">
                    <label>备注</label>
                    <input type="text" class="mui-input-clear" disabled style="color:gray" :value="order.remark == ''? '没备注' : order.remark">
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
            order:{}
        }
    },
    methods:{
        toPay(){
            this.$router.push({name:'Pay', query: {orderId : this.order.id}});
        },
        confirm(){
            this.$http.post("/api/order/" + this.order.id,{statusCode:3}).then(function(res){
                this.mui.toast("确认收货成功");
                this.$router.go(-1);
            },function(res){

            });
        }
    },
    mounted(){
        let orderId = this.$route.query.orderId;

        this.$http.get("/api/order/" + orderId).then(function(res){
            this.order = res.body;
        },function(res){});
    }
}
</script>

<style scoped>

</style>
