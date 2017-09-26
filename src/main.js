import Vue from 'vue'
import VueRouter from 'vue-router'
import vClickOutside from 'v-click-outside'
import VueResource from 'vue-resource'
import GlobalComponents from './globalComponents'
import Notifications from './components/UIComponents/NotificationPlugin'
import SideBar from './components/UIComponents/SidebarPlugin'
import routes from './router/index.js'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/sass/paper-dashboard.scss'
import 'es6-promise/auto'
import App from './App'


Vue.config.productionTip = false;

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(GlobalComponents);
Vue.use(vClickOutside);
Vue.use(Notifications);
Vue.use(SideBar);




Vue.http.interceptors.push((request, next)=> {
  if(localStorage.getItem('jwtToken')){
    request.headers.set('Authorization', + localStorage.getItem('jwtToken'))
  }
  next(response=>{
    if(response.status===400 || response.status===400 || response.status===400 ){
      router.push({path: '/login'});
    }
  })
});

const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
});



router.beforeEach((to, from, next) => {
  if(to.matched.some(record =>
      record.meta.requiresAuth)){
    if(localStorage.getItem("jwtToken")===null){
      next({
        path: '/login'
      })
    }
  }
  next()
});


Object.defineProperty(Vue.prototype, '$Chartist', {
  get () {
    return this.$root.Chartist
  }
})



new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
