import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'

import routes from './routes'
import store from "@/store";

Vue.use(VueRouter)
Vue.use(VueMeta, {
  // The component option name that vue-meta looks for meta info on.
  keyName: 'page',
})

const router = new VueRouter({
  routes,
  // Use the HTML5 history API (i.e. normal-looking routes)
  // instead of routes with hashes (e.g. example.com/#/about).
  // This may require some server configuration in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  mode: 'history',
  // Simulate native-like scroll behavior when navigating to a new
  // route and using back/forward buttons.
})

router.beforeEach((to, from, next) => {
  const loggedIn = store.state.user;
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!loggedIn) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

// Before each route evaluates..

export default router
