<template>
    <div>
        <header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-back mui-pull-left"></a>
		    <h1 class="mui-title">订单列表</h1>
		</header>
        
		<div class="mui-content">

            <ul class="mui-table-view">
                <li v-if="statusCode == 0" class="mui-table-view-cell" style="margin-bottom:-10px;">
                    待支付订单
                </li>
                <li v-else-if="statusCode == 1" class="mui-table-view-cell" style="margin-bottom:-10px;">
                    待发货订单
                </li>
                <li v-else-if="statusCode == 2" class="mui-table-view-cell" style="margin-bottom:-10px;">
                    待确认订单
                </li>
                <li v-else-if="statusCode == 3" class="mui-table-view-cell" style="margin-bottom:-10px;">
                    已完成订单
                </li>
                <li v-else class="mui-table-view-cell" style="margin-bottom:-10px;">
                    全部订单
                </li>
            </ul>
            
            <template v-for="order in orders">
                <ul class="mui-table-view" style="margin-top:20px">
                    <li class="mui-table-view-cell">
                        <p>
                            订单编号 : {{order.id}}
                        </p>
                    </li>
                </ul>
                <ul class="mui-table-view mui-table-view-striped mui-table-view-condensed">
                    <li class="mui-table-view-cell" v-for="item in order.orderItems">
                        <router-link :to="{name:'OrderDetail',query:{orderId: order.id}}">
                            <img class="mui-media-object mui-pull-left" :src="global.imgServerPath + item.product.iconImageUrl">
                            <div class="mui-media-body" style="display: inline-block;">
                                <span>{{item.product.name}}</span>
                                <p class='mui-ellipsis'>￥{{item.product.price}}</p>
                            </div>
                            <div class="mui-media-body" style="display: inline-block;float:right;">
                                <p class="mui-ellipsis">数量：{{item.count}}</p>
                            </div>
                        </router-link>
                    </li>
                </ul>
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell">
                            <div style="float: left;">
                                <h5>运费 ￥0.00</h5>
                                <h5>总价 ￥{{order.totalPrice}}</h5>
                            </div>
                            <div style="float: right;">
                                <button v-if="order.status == 0" v-on:click="toDetail(order.id)" type="button" class="mui-btn mui-btn-primary" style="margin-top: 10px;width: 80px;">
                                    去支付
                                </button>
                                <button v-if="order.status == 1" disabled type="button" class="mui-btn mui-btn-primary" style="margin-top: 10px;width: 80px;">
                                    等待发货
                                </button>
                                <button v-if="order.status == 2" v-on:click="toDetail(order.id)" type="button" class="mui-btn mui-btn-primary" style="margin-top: 10px;width: 80px;">
                                    确认收货
                                </button>
                                <button v-if="order.status == 4" disabled type="button" class="mui-btn mui-btn-primary" style="margin-top: 10px;width: 80px;">
                                    已完成
                                </button>
                            </div>
                    </li>
                </ul>
            </template>

		</div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            orders:[],
            statusCode:null
        }
    },
    methods:{
        toDetail(id){
            this.$router.push({name:'OrderDetail',query:{orderId:id}});
        }
    },
    mounted(){
        let statusCode = this.$route.query.statusCode;
        this.statusCode = statusCode;
        if(statusCode != null){
            this.$http.get("/api/order/list/" + statusCode).then(function(res){
                this.orders = res.body;
            },function(res){

            });
        }else{
            this.$http.get("/api/order/list").then(function(res){
                this.orders = res.body;
            },function(res){

            });
        }
    }
}
</script>

<style scoped>

</style>
