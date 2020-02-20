import Vue from 'vue';
import Router from 'vue-router';
import Login from "../components/Login.vue";


import Status from "../views/Status.vue";
import AddBin from "../views/AddBin.vue";
import EditBin from "../views/EditBin.vue";
import DeleteBin from "../views/DeleteBin.vue";
import Map from "../views/Map.vue";
import Statistics from "../views/Statistics.vue";

import Profile from "../views/Profile.vue";
import firebase from 'firebase';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    
    {
      path: '/Status',
      name: 'Status',
      component: Status,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/AddBin',
      name: 'AddBin',
      component: AddBin,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/EditBin',
      name: 'EditBin',
      component: EditBin,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/DeleteBin',
      name: 'DeleteBin',
      component: DeleteBin,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Map',
      name: 'Map',
      component: Map,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Statistics',
      name: 'Statistics',
      component: Statistics,
      meta: {
        requiresAuth: true
      }
    },
    
    {
      path: '/Profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
  ]
});

// Nav Guard
router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check logged user
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/Profile',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

export default router;