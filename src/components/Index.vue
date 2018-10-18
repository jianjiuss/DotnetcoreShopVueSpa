<template>
    <div>

        <nav class="mui-bar mui-bar-tab">
            <ul class="mui-table-view" v-if="displayCountBar">
                <li class="mui-table-view-cell" style="height:40px;">
                    <span>总价:￥{{totalPrice}}</span>
                    <button type="button" v-on:click="confirm()" class="mui-btn" style="background-color:#ff651b;color:#fff;font-size: 25px;width:25%;right: 0px;">
                        <span style="font-size: 16px;">去结算</span>
                    </button>
                </li>
            </ul>
            <div>
                <router-link to="/category" class="mui-tab-item">
                    <span class="mui-icon-extra mui-icon-extra-class"></span>
                    <span class="mui-tab-label">分类</span>
                </router-link>
                <router-link to="/shopcart" class="mui-tab-item">
                    <span class="mui-icon-extra mui-icon-extra-cart"></span>
                    <span class="mui-tab-label">购物车</span>
                </router-link>
                <router-link to="/usercenter" class="mui-tab-item">
                    <span class="mui-icon mui-icon-contact"></span>
                    <span class="mui-tab-label">个人中心</span>
                </router-link>
            </div>
        </nav>

        <router-view ref="main"></router-view>
    </div>
</template>

<script>
export default {
    data(){
        return{
            displayCountBar: false,
            totalPrice: 0
        }
    },
    methods:{
        confirm: function () {
            this.$router.push({name: 'OrderConfirm'});
        },
    },
    mounted(){
        let r = this.$router;
        this.mui('.mui-bar-tab').on('tap', 'a', function () {
            r.push(this.getAttribute('href').slice(1));
        });
    },
    beforeRouteEnter (to, from, next) {
        if(from.name == null && to.name === "Index"){
            next({name:'Category',replace: true})
        }else{
            next(vm => {
                if(to.name === "ShopCart"){
                    vm.displayCountBar = true;
                }
                else{
                    vm.displayCountBar = false;
                }
            });
        }
    },
    beforeRouteUpdate (to, from, next){
        if(to.name === "ShopCart"){
            this.displayCountBar = true;
        }
        else{
            this.displayCountBar = false;
        }
        next();
    }
}
</script>

<style scoped>
    .router-link-active{
        color: #007aff;
    }
    a{
        color: #929292;
    }
</style>
