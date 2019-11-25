// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import iView from "iview";
import store from "./vuex/store";
import "iview/dist/styles/iview.css";
import "babel-polyfill";
// 引入iconfont
import './iconfont/iconfont.css'
// import $ from 'jquery'
Vue.config.productionTip = false;
Vue.use(iView);
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
