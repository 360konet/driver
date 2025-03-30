import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1/:userId',  // Ensure Tab1 receives userId
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'tab2/:userId',  // Ensure Tab2 receives userId
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'tab3/:userId',
        component: () => import('@/views/Tab3Page.vue')
      }
    ]
  },

  {
    path: '/login',
    component:() =>import('@/views/Auth/Login.vue')
  },

  {
    path: '/register',
    component:() =>import('@/views/Auth/Register.vue')
  },
  {
    path: '/car/register/:userId',
    component:() =>import('@/views/Auth/CarReg.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
