<template>
    <div>
        <header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-back mui-pull-left"></a>
		    <h1 class="mui-title">模拟支付</h1>
		</header>
		<div class="mui-content">
		    <div class="mui-content-padded">
                <button type="button" class="mui-btn mui-btn-block" v-on:click="pay()">点击支付</button>
		    </div>
		</div>
    </div>    
</template>

<script>
export default {
    data (){
        return {
            orderId : -1
        }
    },
    methods:{
        pay: function(){
            this.$http.post("/api/order/" + this.orderId,{StatusCode: 1}).then(function(res){
                this.mui.toast("支付成功");
                this.$router.replace({name:'Category'});
            },function(res){

            });
        }
    },
    mounted(){
        console.log(this.$route.query.orderId);
        this.orderId = this.$route.query.orderId;
    }
}
</script>

<style scope>

</style>
