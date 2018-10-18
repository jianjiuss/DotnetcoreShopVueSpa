// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import '../static/css/mui.css'
import '../static/css/icons-extra.css'
import '../static/css/mui.picker.css'
import '../static/css/mui.poppicker.css'
import mui from '../static/js/mui.js'
import global from './components/global'
import poppicker from '../static/js/mui.poppicker.js'
import picker from '../static/js/mui.picker.js'
import cityData3 from '../static/js/city.data-3.js'

Vue.prototype.global=global
Vue.use(VueResource);
Vue.config.productionTip = false
Vue.prototype.mui = mui

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  mounted(){
    poppicker(this.mui, document);
    picker(this.mui || window, window, document, undefined);
    initPicker(this.mui);
  }
})

var cityPicker3;
Vue.prototype.cityPicker3 = cityPicker3;
Vue.prototype.cityData3 = cityData3;
function initPicker(mui) {
  cityPicker3 = new mui.PopPicker({
      layer: 3
  });
  cityPicker3.setData(cityData3);
}