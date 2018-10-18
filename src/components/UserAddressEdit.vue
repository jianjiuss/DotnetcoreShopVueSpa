<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-back mui-pull-left"></a>
            <h1 class="mui-title">收货地址</h1>
        </header>

        <div class="mui-content" id="content">
            <div class="mui-content-padded" style="margin: 5px;">
                <form class="mui-input-group">
                    <div class="mui-input-row">
                        <label>姓名</label>
                        <input type="text" placeholder="收货人姓名" v-model="address.name">
                    </div>
                    <div class="mui-input-row">
                        <label>手机号码</label>
                        <input type="text" class="mui-input-clear" placeholder="输入手机号码"
                            v-model="address.phone"
                            ime-mode:disabled
                            onkeydown="if(event.keyCode==13)event.keyCode=9"
                            onKeypress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false">
                    </div>

                    <div class="mui-input-row">
                        <label>所在地区</label>
                        <input type="text" v-model="address.addressArea" v-on:click="showPicker" placeholder="点击选择地区" id='showCityPicker3' readonly="readonly">
                    </div>
                    <div class="mui-input-row">
                        <label>邮政编码</label>
                        <input type="text" placeholder="邮政编码"
                            v-model="address.postalCode"
                            ime-mode:disabled
                            onkeydown="if(event.keyCode==13)event.keyCode=9"
                            onKeypress="if((event.keyCode<48 || event.keyCode>57)) event.returnValue=false">
                    </div>
                    <div class="mui-input-row">
                        <label>详细地址</label>
                        <input type="text" placeholder="输入详细地址"
                            v-model="address.addressDetail">
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
        return {
            address: {
                id: "",
                addressArea: "",
                addressDetail: "",
                postalCode: "",
                phone: "",
                name: "",
                isDefault: false
            }
        }
    },
    methods: {
        commit: function () {
            if (this.address.id) {
                this.$http.post("/api/useraddress/" + this.address.id, this.address).then(function (res) {
                    this.$router.go(-1);
                }, function (res) {
                    this.mui.toast(res.body);
                });
            } else {
                this.$http.put("/api/useraddress", this.address).then(function (res) {
                    this.$router.go(-1);
                }, function (res) {
                    this.mui.toast(res.body);
                });
            }
        },
        showPicker: function () {
            let vm = this;
            let data = this.cityData3;
            this.cityPicker3.show(function (items) {
                vm.address.addressArea = _getParam(items[0], 'text') + " " + _getParam(items[1], 'text') + " " + _getParam(items[2], 'text');
                document.getElementById("showCityPicker3").value = vm.address.addressArea;
            });
        }
    },
    mounted () {
        var id = this.$router.currentRoute.query.id;
        if (id) {
            this.$http.get("/api/useraddress/" + id).then(function (res) {
                this.address = res.body;
            });
        }
    }
}

var _getParam = function (obj, param) {
  return obj[param] || '';
};
</script>

<style scope>
</style>
