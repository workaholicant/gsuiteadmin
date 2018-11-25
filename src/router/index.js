import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/SignIn/SignIn.vue'
import Summary from '@/components/Summary/Summary.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'signin'
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/summary',
      name: 'Summary',
      component: Summary
    }
  ]
})
