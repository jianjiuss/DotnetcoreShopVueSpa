import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Category from '@/components/Category'
import ShopCart from '@/components/ShopCart'
import UserCenter from '@/components/UserCenter'
import Login from '@/components/Login'
import Register from '@/components/Register'
import ShopList from '@/components/ShopList'
import ProductDetail from '@/components/ProductDetail'
import UserAddresses from '@/components/UserAddresses'
import UserAddressEdit from '@/components/UserAddressEdit'
import UserCollections from '@/components/UserCollections'
import UserInfoEdit from '@/components/UserInfoEdit'
import OrderConfirm from '@/components/OrderConfirm'
import Pay from '@/components/Pay'
import UserOrder from '@/components/UserOrder'
import OrderDetail from '@/components/OrderDetail'
import ProductSearch from '@/components/ProductSearch'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      children:[
        {
          path: 'category',
          name: 'Category',
          component: Category
        },
        {
          path: 'shopcart',
          name: 'ShopCart',
          component: ShopCart
        },
        {
          path: 'usercenter',
          name: 'UserCenter',
          component: UserCenter
        }
      ],
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/shoplist/:id',
      name: 'ShopList',
      component: ShopList,
      props: true
    },
    {
      path: '/productdetail/:id',
      name: 'ProductDetail',
      component: ProductDetail,
      props: true
    },
    {
      path: '/useraddresses',
      name: 'UserAddresses',
      component: UserAddresses
    },
    {
      path: '/useraddressedit',
      name: 'UserAddressedit',
      component: UserAddressEdit
    },
    {
      path: '/usercollections',
      name: 'UserCollections',
      component: UserCollections
    },
    {
      path: '/userinfoedit',
      name: 'UserInfoEdit',
      component: UserInfoEdit
    },
    {
      path: '/orderconfirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay
    },
    {
      path: '/userorder',
      name: 'UserOrder',
      component: UserOrder
    },
    {
      path: '/orderdetail',
      name: 'OrderDetail',
      component: OrderDetail
    },
    {
      path: '/productsearch',
      name: 'ProductSearch',
      component: ProductSearch
    }
  ]
})
