// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.Base.conf with an alias.
if (process.env.NODE_ENV == 'production') {
  window.API_ROOT = 'http://' + window.location.hostname;
  window.LOGIN_URL = [window.API_ROOT, '/oauth'].join('');
} else {
  window.API_ROOT = './mock';
  window.LOGIN_URL = './mock/login';
  window.MENU_URL = './mock/menu';
}

import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

import './scss/global.scss'
window.axios = require('axios');
if(store.state.loginModule.accessToken != null)
  axios.defaults.headers.common['Access-Token'] = store.state.loginModule.accessToken;
window.qs = require('qs');

Vue.config.productionTip = false

import Dialogs from './components/Dialogs';
Vue.use(Dialogs)

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
