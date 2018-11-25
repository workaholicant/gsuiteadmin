// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import GAuth from 'vue-google-oauth2'

import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Notification.requestPermission(function (status) {
  console.log('Notification permission status:', status)
})

let axiosInstance = axios.create({
  baseURL: '/',
  headers: {
  }
})

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    primary: '#00897B'
  }
})
Vue.use(VueAxios, axiosInstance)
Vue.use(GAuth, {clientId: process.env.GOOGLE_CLIENT_ID, scope: 'profile email https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/admin.directory.user https://www.googleapis.com/auth/admin.reports.usage.readonly https://www.googleapis.com/auth/admin.reports.audit.readonly'})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axiosInstance,
  template: '<App/>',
  components: { App }
})
