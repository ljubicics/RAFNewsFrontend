import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      authRequired: false,
    },
    component: HomeView
  },
  // {
  //   path: '/news',
  //   name: 'News',
  //   meta: {
  //     authRequired: false,
  //   },
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/News.vue')
  // },
  {
    path: 'users/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginUser.vue')
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      authRequired: false,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.authRequired) {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      next({name: 'Login'});
      return;
    }

    const payload = JSON.parse(atob(jwt.split('.')[1]));
    const expDate = new Date(payload.exp * 1000);

    const type = payload.type;
    console.log(type)
    if (to.meta.adminRequired) {
      if (type != 1) {
        alert("Only admin can work with users");
        return;
      }
    }

    if (expDate < new Date()) {
      next({name: 'Login'});
      return;
    }
  }

  next();
});

export default router
