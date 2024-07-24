import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Admin',
    component: () => import('@/pages/admin/AdminPage.vue'),
    children: [
      {
        path: '/',
        name: 'AdminDashboard',
        component: () => import('@/pages/admin/DashboardPage.vue'),
        meta: {
          title: 'Dashboard'
        }
      },
      {
        path: '/blocks',
        name: 'AdminBlocks',
        component: () => import('@/pages/admin/blocks/BlocksPage.vue'),
      },
      {
        path: '/transactions',
        name: 'AdminTransactions',
        component: () => import('@/pages/admin/transactions/TransactionsPage.vue'),
      },
      {
        path: '/messages',
        name: 'AdminMessages',
        component: () => import('@/pages/admin/messages/MessagesPage.vue'),
      },
      {
        path: '/addresses',
        name: 'AdminAddresses',
        component: () => import('@/pages/admin/addresses/AddressesPage.vue'),
      },
      {
        path: '/contracts',
        name: 'AdminContracts',
        component: () => import('@/pages/admin/contracts/ContractsPage.vue'),
      }
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/auth/LoginPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/errors/NotFoundPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.beforeEach((to, from) => {
  document.title = `${to.meta?.title ?? import.meta.env.VITE_APP_TITLE}`
  const token = localStorage.getItem('token')
  if ( to.name !== 'Login' && !token ) {
    return { name: "Login" };
  } else if ( to.name === 'Login' && token ) {
    return { name: "AdminDashboard" };
  }  else {
    return  true;
  }
});


export default router
