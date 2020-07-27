import Vue from "vue";
import VueRouter from 'vue-router';

import Home from '../components/Home'
import Shop from '../components/Shop'

Vue.use(VueRouter);

const routes = [
    {
        path: '/', name: 'Home', components: Home
    },
    {
        path: '/shop', name: 'Shop', components: Shop
    }
];
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'Holo',
//       component: Holo
//     }
//   ]
// })

const router = new VueRouter({
    routes,
    mode: "history"
});

export default router;