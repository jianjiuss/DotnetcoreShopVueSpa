<template>
    <div>
        <div class="mui-bar mui-bar-nav">
            <router-link :to="{name:'ProductSearch'}" class="mui-btn mui-pull-right">搜索商品</router-link>
        </div>

        <div class="mui-content mui-row mui-fullscreen" id="categories">
            <div class="mui-col-xs-3">
                <div id="segmentedControls" class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-vertical">
                    <a class="mui-control-item" href="#" v-for="item in topCategories" v-on:click="getChilds(item.id)" v-text="item.name"></a>
                </div>
            </div>
            <div id="segmentedControlContents" class="mui-col-xs-9" style="border-left: 1px solid #c8c7cc;">

                <div class="mui-control-content mui-active">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell" v-for="item in childCategories" :key="item.id" v-text="item.name" v-on:click="toShopList(item.id)">
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Category',
    data () {
        return {
            topCategories: [
            ],
            childCategories: [
            ]
        }
    },
    methods: {
        getChilds: function (id) {
            if (id == -1) {
                this.$router.push("/shoplist/all");
            }
            else {
                this.$http.get('/api/categories/childs/' + id).then(function (res) {
                    this.childCategories = res.body;
                }, function () {
                    console.log('请求失败处理');
                });
            }
        },
        toShopList: function (id) {
            this.$router.push("/shoplist/" + id);
        },
        toSetting: function () {
            window.location.href = "/user-setting.html";
        }
    },
    mounted(){
        this.$http.get('/api/categories/childs').then(function (res) {
            res.body.splice(0, 0, { id: -1, name: "全部" });
            this.topCategories = res.body;
        }, function (res) {
            console.log('请求失败');
        });
    }
}
</script>

<style scoped>
    .mui-row.mui-fullscreen > [class*="mui-col-"] {
        height: 100%;
    }

    .mui-col-xs-3,
    .mui-control-content {
        overflow-y: scroll;
        height: 100%;
    }

    .mui-segmented-control .mui-control-item {
        line-height: 50px;
        width: 100%;
    }

    .mui-segmented-control.mui-segmented-control-inverted .mui-control-item.mui-active {
        background-color: #fff;
    }
</style>


