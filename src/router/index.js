import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      authRequired: false,
    },
    component: HomeView,
  },
  {
    path: "/news",
    name: "News",
    meta: {
      authRequired: false,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/NewsView.vue"),
  },
  {
    path: "/news/singlenews/:id",
    name: "SingleNews",
    meta: {
      authRequired: false,
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/SingleNews.vue"),
  },
  {
    path: "/news/category/:id",
    name: "CategoryNews",
    meta: {
      authRequired: false,
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/CategoryNews.vue"),
  },
  {
    path: "/news/tag/:id",
    name: "TagNews",
    meta: {
      authRequired: false,
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/TagNews.vue"),
  },
  {
    path: "/news/popular",
    name: "PopularNews",
    meta: {
      authRequired: false,
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/PopularNews.vue"),
  },
  {
    path: "/news/manage",
    name: "ManageNews",
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/ManageNewsView.vue"),
  },
  {
    path: "/news/add",
    name: "AddNews",
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/AddNewsView.vue"),
  },
  {
    path: "/news/edit/:id",
    name: "EditNews",
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/EditNewsView.vue"),
  },
  {
    path: "/categories",
    name: "Categories",
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/CategoriesView.vue"),
  },
  {
    path: "/categories/add",
    name: "AddCategory",
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/AddCategoryView.vue"),
  },
  {
    path: "/categories/edit/:id",
    name: "EditCategory",
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/EditCategoryView.vue"),
  },
  {
    path: "users/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "about" */ "../views/LoginUser.vue"),
  },
  {
    path: "/users",
    name: "Users",
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/UserView.vue"),
  },
  {
    path: "users/add",
    name: "UsersAdd",
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/AddUserView.vue"),
  },
  {
    path: "/users/edit/:email",
    name: "UsersEdit",
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/EditUserView.vue"),
  },
  {
    path: "/about",
    name: "about",
    meta: {
      authRequired: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/tag",
    name: "Tags",
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/TagsView.vue"),
  },
  {
    path: "/tag/add",
    name: "AddTag",
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/AddTag.vue"),
  },
  {
    path: "/categories/add",
    name: "AddCategory",
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/AddCategoryView.vue"),
  },
  {
    path: "/tag/edit/:id",
    name: "EditTag",
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/EditTagView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.authRequired) {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      next({ name: "Login" });
      return;
    }

    const payload = JSON.parse(atob(jwt.split(".")[1]));
    const expDate = new Date(payload.exp * 1000);

    const type = payload.type;
    if (to.meta.adminRequired) {
      if (type != 1) {
        alert("Only admin can work with users");
        return;
      }
    }

    if (expDate < new Date()) {
      next({ name: "Login" });
      return;
    }
  }

  next();
});

export default router;
