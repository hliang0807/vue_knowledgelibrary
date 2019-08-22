import Vue from 'vue'
import Router from 'vue-router'
import Register from '../views/Register'
import Login from "../views/Login";
import Home from "../views/Home"

Vue.use(Router)

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}

var routes=[
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path:'/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requireAuth: true
    }
  }
]
const router = new Router({
  routes:routes
});

export default router




