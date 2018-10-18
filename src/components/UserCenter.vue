<template>
    <div class="mui-content" id="content">
        <div class="mui-loading" v-if="isLoading">
            <div class="mui-spinner">
            </div>
        </div>
        
        <template v-if="!isLoading">

            <template v-if="user != null">
                <ul class="mui-table-view mui-table-view-chevron">
                    <li class="mui-table-view-cell mui-media">
                        <router-link class="mui-navigate-right" :to="{name:'UserInfoEdit'}">
                            <img class="mui-media-object mui-pull-left head-img" id="head-img" v-bind:src="global.imgServerPath + user.headphotoUrl">
                            <div class="mui-media-body">
                                <span v-text="user.name"></span>
                                <p class='mui-ellipsis'>账号:<span v-text="user.name"></span></p>
                            </div>
                        </router-link>
                    </li>
                </ul>

                <ul class="mui-table-view mui-table-view-chevron" style="margin-top: 20px;">
                    <li class="mui-table-view-cell">
                        <router-link :to="{name:'UserOrder'}" class="mui-navigate-right">我的全部订单</router-link>
                    </li>
                </ul>
                <ul class="mui-table-view mui-grid-view">
                    <li class="mui-table-view-cell mui-media mui-col-xs-3">
                        <router-link :to="{name:'UserOrder',query:{statusCode:0}}">
                            <span class="mui-icon-extra mui-icon-extra-card"></span>
                            <div class="mui-media-body">待支付</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-3">
                        <router-link :to="{name:'UserOrder',query:{statusCode:1}}">
                            <span class="mui-icon-extra mui-icon-extra-express"></span>
                            <div class="mui-media-body">待发货</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-3">
                        <router-link :to="{name:'UserOrder',query:{statusCode:2}}">
                            <span class="mui-icon-extra mui-icon-extra-topic"></span>
                            <div class="mui-media-body">待收货</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-3">
                        <router-link :to="{name:'UserOrder',query:{statusCode:3}}">
                            <span class="mui-icon-extra mui-icon-extra-gift"></span>
                            <div class="mui-media-body">已完成</div>
                        </router-link>
                    </li>
                </ul>

                <ul class="mui-table-view mui-grid-view" style="margin-top: 20px;">
                    <li class="mui-table-view-cell mui-media mui-col-xs-3">
                        <router-link to="/useraddresses">
                            <span class="mui-icon mui-icon-location"></span>
                            <div class="mui-media-body">收货地址</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-3">
                        <router-link :to="{name : 'UserCollections'}">
                            <span class="mui-icon-extra mui-icon-extra-heart"></span>
                            <div class="mui-media-body">我的收藏</div>
                        </router-link>
                    </li>
                </ul>

                <div class="mui-content-padded">
                    <button type="button" class="mui-btn mui-btn-danger mui-btn-block" v-on:click="logout">退出账号</button>
                </div>
            </template>

            <template v-if="user == null">
                <div class="mui-card">
                    <div class="mui-card-content">
                        <div class="mui-card-content-inner">
                            当前未登录账号，请先点击下面按钮进行登录。
                        </div>
                    </div>
                </div>

                <div class="mui-content-padded">
                    <button type="button" class="mui-btn mui-btn-primary mui-btn-block" v-on:click="toLogin()">登录</button>
                    <button type="button" class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined" v-on:click="toRegister()">注册</button>
                </div>
            </template>
        </template>

    </div>
</template>

<script>
export default {
    data () {
        return {
            user: null,
            isLoading: true
        }
    },
    methods: {
        toLogin: function () {
            this.$router.push("/login");
        },
        toRegister: function (){
            this.$router.push("/register");
        },
        logout: function () {
            this.$http.get("/api/user/logout");
            this.user = null;
        }
    },
    mounted: function () {
        this.$http.get("/api/user").then(function (res) {
            this.user = res.body;
            this.isLoading = false;
        }, function (res) {
            if (res.status == 401) {
                this.user = null;
            }
            this.isLoading = false;
            console.log('请求失败');
        });
    }
}
</script>

<style scoped>

</style>