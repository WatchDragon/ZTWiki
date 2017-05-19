import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/LoginView'
import Main from '@/views/MainView'
import Test from '@/views/TestView'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'Main', component: Main},
    {path:'/login',name:'Login',component:Login},
      {path:'/test',name:'Test',component:Test}
  ]
})
