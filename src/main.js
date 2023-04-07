// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import Axios from 'axios'
import './default.css'

//引入饿了么UI的CSS样式
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

Axios.defaults.baseURL = ""
Vue.prototype.$axios = Axios

// Vue.filter('imageFliter', function(image) {
//   // http://117.78.3.167/static/goods/16358378474012442logo.png
//   var list = image.split("\/");
//   return "http://117.78.3.167/static/goods/" + list[list.length-1];
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
