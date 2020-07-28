import Vue from 'vue'
import App from './App.vue'
// import router from './router/router'
import store from './store'

import Home from './components/Home'
import Shop from './components/Shop'

import VueRouter from 'vue-router'
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/shop', component: Shop },
  ]
});


new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),
})
