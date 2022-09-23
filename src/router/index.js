import "../Firebase";
import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NotFound from '../views/NotFound.vue'
const auth = getAuth();
const user = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
      unsubscribe()
      resolve(userFirebase)
    }, reject)

  })
};

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/SignUpView')
  },

  // will match everything and put it under `$route.params.pathMatch`

  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },


  {
    path: '/products',
    name: 'products',
    component: () => import('../views/ProductsView'),

  },
  {
    path: '/myproducts',
    name: 'myproducts',
    component: () => import('../views/MyProductsView'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/products/:id',
    name: 'details',
    component: () => import('../views/ProductDetails'),

  },
  {
    path: '/products/:id',
    name: 'LinkNotFound',
    component: () => import('../views/LinkNotFound'),

  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView')
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('../views/HomeView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/Cart.vue'),
  },
  {
    path: '/orders',
    name: 'OrdersView',
    component: () => import('../views/Orders'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !await user()) {
    next('signin');
  } else {
    next();
  }
});