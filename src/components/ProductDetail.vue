<template>
<div>
    <header class="mui-bar mui-bar-nav">
        <a class="mui-action-back mui-icon mui-icon-back mui-pull-left"></a>
        <h1 class="mui-title">商品详情</h1>
    </header>

    <div id="content" class="mui-content">
        <div class="mui-loading" v-if="isLoading">
            <div class="mui-spinner">
            </div>
        </div>

        <template v-if="!isLoading">

            <div id="slider" class="mui-slider">
                <div class="mui-slider-group mui-slider-loop">
                    <template v-if="product.titleImages != null && product.titleImages.length > 0">
                        <!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->
                        <div class="mui-slider-item mui-slider-item-duplicate">
                            <a href="#">
                                <img v-bind:src="global.imgServerPath + product.titleImages[product.titleImages.length - 1].image.imageUrl">
                            </a>
                        </div>

                        <template v-for="titleImage in product.titleImages">
                            <div class="mui-slider-item">
                                <a href="#">
                                    <img v-bind:src="global.imgServerPath + titleImage.image.imageUrl">
                                </a>
                            </div>
                        </template>

                        <!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->
                        <div class="mui-slider-item mui-slider-item-duplicate">
                            <a href="#">
                                <img v-bind:src="global.imgServerPath + product.titleImages[0].image.imageUrl">
                            </a>
                        </div>
                    </template>
                </div>
                <div class="mui-slider-indicator">

                    <template v-for="(item, index) in product.titleImages">
                        <div class="mui-indicator mui-active" v-if="index == 0"></div>
                        <div class="mui-indicator" v-if="index != 0"></div>
                    </template>

                </div>
            </div>

            <div class="detail">
                <h4><span v-text="product.name"></span></h4>
                <div class="detail-money" id="m-rx">
                    <div class="money-left" id="m-price" v-text="'￥' + product.price"></div>
                </div>
                <div class="detail-quantity">
                    <div class="quantity-left">库存<span v-text="product.store"></span></div>
                </div>
            </div>

            <div style="padding:5px 10px; background-color:#fff;">
                <div id="segmentedControl"
                     class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-primary">
                    <a class="mui-control-item  mui-active" href="#medDetail">商品详情</a>
                    <a class="mui-control-item" href="#imgDetail">图文详情</a>
                </div>
            </div>
            <div class="tab-container">
                <!--<h6 class="del  ">图文详情</h6>-->
                <div class="med-detail img-detail mui-control-content" id="imgDetail">
                    <img class="detail-img" style="width:100%;" v-for="infoImage in product.infoImages" v-bind:src="global.imgServerPath + infoImage.image.imageUrl" />
                </div>
                <!-- <h6 class="del  ">基本信息</h6>-->
                <div class="med-detail  mui-active mui-control-content med-detail1" id="medDetail">

                    <template v-for="description in product.descriptions">
                        <div class="detail-content">
                            <p class="title">-{{description.title}}</p>
                            <p class="content">-{{description.content}}</p>
                        </div>
                    </template>

                </div>

            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </template>

        <!--购物车选项弹出框-->
        <div id="buy-item-list" class="mui-popover mui-popover-bottom mui-popover-action" style="z-index:999;">
            <h4 class="_title">请选择规格数量</h4>
            <div class="_product-img-container">
                <div class="_product-img">
                    <img v-bind:src="global.imgServerPath + product.iconImageUrl">
                </div>
                <div class="_product-detail">
                    <h4 v-text="product.name"></h4>
                    <div class="_product-detail-msg">
                        <div class="_product-money">￥<span v-text="product.price"></span></div>
                        <div class="_product-quantity">剩余：<span v-text="product.store"></span>件</div>
                    </div>
                </div>
            </div>
            <div class="buy-number-container">
                <div class="buy-number-title">购买数量</div>
                <div class="mui-numbox" data-numbox-min='1' v-bind:data-numbox-max="product.store">
                    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                    <input class="mui-input-numbox" type="number" v-bind:value="addCartNumb" v-on:change="changeNumb">
                    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
                </div>
            </div>
            <div class="add-buy-car" v-on:click="addCart()">
                <div class="next-step">
                    加入购物车 >
                </div>
            </div>
        </div>

        <!--底部的工具条开始-->
        <nav class="mui-bar mui-bar-tab" style="font-size: 0; padding: 0px; margin: 0px;">
            <button type="button" class="mui-btn" style="width:15%; top:0px; padding-top:0px;padding-bottom:0px;border-radius: 0;border: 0px solid #ccc;" v-on:click="addToCollections">
                <span class="mui-icon-extra" v-bind:class="collectionIconClass" style="font-size:25px;padding-bottom:0px;"></span><br />
                <span style="font-size:12px;">收藏</span>
            </button>
            <button type="button" class="mui-btn" style="width:15%; top:0px; padding-top:0px;padding-bottom:0px;border-radius: 0;border: 0px solid #ccc;" v-on:click="toCart()">
                <span class="mui-icon-extra mui-icon-extra-cart" style="font-size:25px;padding-bottom:0px;"></span><br />
                <span style="font-size: 12px;">购物车</span>
            </button>
            <button type="button" class="mui-btn" style="background-color: #f68c03; color:#fff;font-size: 25px; width:35%;height: 100%; top:0px;border-radius: 0;border: 0px solid #ccc;" v-on:click="openAddCart()">
                <span class="iconfont icon-kanjiax" style="font-size: 20px;"></span>
                <span style="font-size: 16px;">加入购物车</span>
            </button>
            <button type="button" class="mui-btn" style="background-color:#ff651b;color:#fff;font-size: 25px;width:35%;height: 100%;  top:0px;border-radius: 0;border: 0px solid #ccc;" v-on:click="addProduct()">
                <span class="iconfont icon-dianhua1" style="font-size: 20px;"></span>
                <span style="font-size: 16px;">立即购买</span>
            </button>
        </nav>
        <!--底部的工具条结束-->
    </div>    
</div>
</template>

<script>
export default {
    data () {
        return{
            product: {
                
            },
            isLoading: true,
            addCartNumb: 1,
            isCollected:false
        }
    },
    props: ["id"],
    methods: {
        addProduct: function () {
            this.$http.put("/api/shopcart", { productId: this.product.id, numb: 1 }).then(function () {
                this.$router.push("/shopcart");
            }, function (res) {
                if (res.status == 401) {
                    this.mui.toast("请先登录再购买");
                } else {
                    this.mui.toast(res.body);
                }
            })
        },
        openAddCart: function () {
            this.mui('#buy-item-list').popover('toggle');
        },
        addCart: function () {
            this.$http.put("/api/shopcart", {
                productId: this.product.id,
                numb: this.addCartNumb
            }).then(function (res) {
                this.mui.toast("加入购物车成功");
                this.openAddCart();
                this.addCartNumb = 1;
            }, function (res) {
                if (res.status == 401) {
                    this.mui.toast("请先登录再购买");
                } else {
                    this.mui.toast(res.body);
                }
            });
        },
        changeNumb: function (event) {
            this.addCartNumb = event.target.value;
        },
        toCart: function () {
            this.$router.push("/shopcart");
        },
        addToCollections: function () {
            if (this.isCollected) {
                this.$http.delete("/api/usercollection/" + this.product.id).then(function () {
                    this.isCollected = false;
                }, function (res) {
                    if (res.status == 401) {
                        this.mui.toast("请先登录再收藏");
                    } else {
                        this.mui.toast(res.body);
                    }
                });
            } else {
                this.$http.put("/api/usercollection/" + this.product.id).then(function () {
                    this.isCollected = true;
                }, function (res) {
                    if (res.status == 401) {
                        this.mui.toast("请先登录再收藏");
                    } else {
                        this.mui.toast(res.body);
                    }
                });
            }
        }
    },
    updated: function () {
        var slider = this.mui(".mui-slider");
        slider.slider({
            interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
        });
        this.mui('.mui-numbox').numbox();
    },
    mounted: function () {
        var slider = this.mui(".mui-slider");
        slider.slider({
            interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
        });
        
        this.$http.get("/api/product/" + this.id).then(function (res) {
            this.product = res.body;
            this.isLoading = false;
            this.$http.get("/api/usercollection/" + this.product.id).then(function (res) {
                this.isCollected = true;
            });
        }, function () {
            console.log('请求失败');
            this.isLoading = false;
        })
    },
    computed: {
        collectionIconClass: function () {
            return {
                "mui-icon-extra-heart-filled": this.isCollected,
                "mui-icon-extra-heart": !this.isCollected
            }
        }
    }
}
</script>

<style scope>
    #imgDetail{
        line-height: 0px;
    }

    .detail {
        padding: 0 10px;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        background-color: #fff;
    }

    .detail-money .money-left, .detail-quantity {
        font-weight: bold;
        color: #00afc5;
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        border-bottom: 1px solid #f9f9f9;
    }

    h4 {
        font-weight: normal;
        font-size: 16px;
        margin-top: 10px;
    }

    .detail-quantity .quantity-left {
        font-size: 14px;
        padding: 0px;
        color: black;
    }

    .title {
        margin-bottom: 5px;
        font-weight: bold;
        color: #000;
    }

    .content {
        color: #000;
        text-indent: 2em;
    }

    /*buy-item-list*/
    #buy-item-list {
        background-color: #fff;
    }

    #buy-item-list ._title {
        background-color: rgb(243,243,243);
        padding: 0 15px;
        margin: 0;
        line-height: 30px;
        font-size: 14px;
        color: #000;
    }

    #buy-item-list ._product-img-container {
        padding: 10px 15px;
        border-bottom: 1px solid #eee;
    }

    #buy-item-list .buy-number-container {
        padding: 0 15px;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #buy-item-list .buy-number-title {
        font-size: 14px;
    }

    .add-buy-car {
        height: 60px;
        background-color: #f23030;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .add-buy-car p {
        font-size: 12px;
        color: #fff;
        margin-bottom: 5px;
        margin-right: 10px;
    }

    .add-buy-car .next-step {
        border-left: 1px solid #fff;
        font-size: 18px;
        color: #fff;
        line-height: 30px;
        padding-left: 10px;
    }

    ._product-img-container {
        padding: 8px 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex: auto;
    }

    ._product-detail h4 {
        font-weight: normal;
        font-size: 15px;
        line-height: 20px;
    }

    ._product-detail-msg {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        margin-top: 5px;
    }

    ._product-money {
        color: #00afc5;
    }

    ._product-quantity {
        font-size: 14px;
        color: #cccccc;
    }

    ._product-img {
        max-width: 60px;
        width: 60px;
        height: 60px;
        flex-shrink: 0;
        margin-right: 5px;
    }

    ._product-detail {
        flex-grow: 1;
    }

    ._product-img img {
        width: 100%;
        height: 100%;
    }

    .mui-icon-extra-heart-filled {
        color: red;
    }
</style>
