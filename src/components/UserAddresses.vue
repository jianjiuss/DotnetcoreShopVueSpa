<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-back mui-pull-left"></a>
            <h1 class="mui-title">收货地址</h1>
        </header>

        <div class="mui-content" id="content">
            <ul class="mui-table-view mui-table-view-striped mui-table-view-condensed" style="margin-bottom: 20px;">

                <template v-for="address in userAddresses">

                    <li class="mui-table-view-cell">
                        <div class="mui-table">
                            <div class="mui-table-cell mui-col-xs-10">
                                <h5>{{address.name}}</h5>
                                <h5>{{address.phone}}</h5>
                                <h5><span>{{address.addressArea.replace(/\s*/g,"")}}</span>&nbsp;&nbsp;&nbsp;<span>{{address.addressDetail}}</span></h5>
                                <template v-if="!select">
                                    <div class="mui-input-row mui-radio mui-left">
                                        <label style="padding-left: 35px;">默认</label>
                                        <input name="radio1" type="radio" style="left: 0px;" v-bind:value="address.id" v-model="defaultAddressId">
                                    </div>
                                </template>
                            </div>
                            <template v-if="select">
                                <div class="mui-table-cell mui-col-xs-2 mui-text-right" style="width:54px;">
                                    <button type="button" class="mui-btn mui-btn-primary" style="width:54px;" v-on:click="selectShipping(address.id)">
                                        选择
                                    </button>
                                </div>
                            </template>
                            <template v-else>
                                <div class="mui-table-cell mui-col-xs-2 mui-text-right" style="width:54px;">
                                    <button type="button" class="mui-btn mui-btn-primary" style="width:54px;" v-on:click="toEdit(address.id)">
                                        编辑
                                    </button>
                                    <a style="display: block; margin:15px 0 0 0; text-align: center;" v-on:click="remove(address.id)">
                                        删除
                                    </a>
                                </div>
                            </template>
                        </div>
                    </li>

                </template>

            </ul>
            <template v-if="!select">
                <button type="button" class="mui-btn mui-btn-primary mui-btn-block" style="margin: auto;width: 70%; margin-bottom:20px;" v-on:click="toAdd">添加新地址</button>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            userAddresses: [
    
            ],
            defaultAddressId: 1,
            select: false
        }
    },
    methods: {
        remove: function (id) {
            this.$http.delete("/api/useraddress/" + id).then(function () {
                var removeIndex;
                for (var i = 0; i < this.userAddresses.length; i++) {
                    if (this.userAddresses[i].id == id) {
                        removeIndex = i;
                        break;
                    }
                }
                this.userAddresses.splice(removeIndex, 1);
            });
        },
        toEdit: function (id) {
            this.$router.push({ name: 'UserAddressedit', query: { id }});
        },
        toAdd: function () {
            this.$router.push("/useraddressedit");
        },
        selectShipping: function(id){
            window.localStorage.shipId = id;
            this.$router.go(-1);
        }
    },
    watch: {
        // 如果 `question` 发生改变，这个函数就会运行
        defaultAddressId: function (newId, oldId) {
            var address;
            for (var i = 0; i < this.userAddresses.length; i++) {
                if (this.userAddresses[i].id == newId) {
                    address = this.userAddresses[i];
                    break;
                }
            }

            address.isDefault = true;

            this.$http.post("/api/useraddress/" + address.id, address);
        }
    },
    mounted (){
        this.$http.get("/api/useraddress").then(function (res) {
            this.userAddresses = res.body;
            for (var i = 0; i < this.userAddresses.length; i++) {
                if (this.userAddresses[i].isDefault) {
                    this.defaultAddressId = this.userAddresses[i].id;
                }
            }
        }, function (res) {
        });
        let select = this.$route.query.select;
        if(select){
            this.select = true;
        }
    }
}
</script>

<style scoped>

</style>
