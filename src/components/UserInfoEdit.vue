<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-back mui-pull-left"></a>
            <h1 class="mui-title">用户信息</h1>
        </header>

        <div class="mui-content" id="content">
            <div class="mui-content-padded" style="margin: 5px;">
                <form class="mui-input-group">
                    <div class="mui-input-row">
                        <label>用户名</label>
                        <input type="text" v-bind:value="userInfo.name" placeholder="普通输入框" disabled>
                    </div>
                    <div class="mui-input-row mui-radio" style="display: inline-block;">
                        <label>性别</label>
                    </div>
                    <div class="mui-input-row mui-radio mui-left mui-col-xs-4" style="display: inline-block;">
                        <label>男</label>
                        <input name="radio1" type="radio" value="male" v-model="userInfo.gender">
                    </div>
                    <div class="mui-input-row mui-radio mui-left mui-col-xs-4" style="display: inline-block;">
                        <label>女</label>
                        <input name="radio1" type="radio" value="female" v-model="userInfo.gender">
                    </div>
                    <div class="mui-input-row">
                        <label>年龄</label>
                        <input type="text" placeholder="输入年龄"
                            v-model="userInfo.age"
                            ime-mode:disabled
                            onkeydown="if(event.keyCode==13)event.keyCode=9"
                            onKeypress="if((event.keyCode<48 || event.keyCode>57)) event.returnValue=false">
                    </div>
                    <div class="mui-input-row">
                        <label>所在地区</label>
                        <input type="text"
                            v-model="userInfo.locality"
                            v-on:click="showPicker"
                            placeholder="点击选择地区"
                            id='showCityPicker3'
                            readonly="readonly">
                    </div>
                    <div class="mui-input-row">
                        <label>手机号码</label>
                        <input type="text" class="mui-input-clear" placeholder="输入手机号码"
                            v-model="userInfo.phone"
                            ime-mode:disabled
                            onkeydown="if(event.keyCode==13)event.keyCode=9"
                            onKeypress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false">
                    </div>
                    <div class="mui-button-row">
                        <button type="button" class="mui-btn mui-btn-primary" v-on:click="commit">确认</button>&nbsp;&nbsp;
                        <button type="button" class="mui-btn mui-btn-danger mui-action-back" onclick="return false;">取消</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return{
            userInfo: {
                name: "",
                age: "",
                gender: "",
                locality: "",
                phone: ""
            }
        }
    },
    methods: {
        commit: function () {
            this.$http.post("/api/user/info", this.userInfo).then(function () {
                this.$router.go(-1);
            }, function (res) {
                this.mui.toast(res.body);
            });
        },
        showPicker: function () {
            let vm = this;
            this.cityPicker3.show(function (items) {
                vm.userInfo.locality = _getParam(items[0], 'text') + " " + _getParam(items[1], 'text') + " " + _getParam(items[2], 'text');
            });
        }
    },
    mounted: function () {
        this.$http.get("/api/user").then(function (res) {
            this.userInfo = res.body;
        }, function (res) {
            if (res.status == 401) {
                this.$router.replace("/login");
            } else {
                this.mui.toast(res.body);
            }
        });
    }
}

var _getParam = function (obj, param) {
    return obj[param] || '';
};
</script>

<style scoped>

</style>
