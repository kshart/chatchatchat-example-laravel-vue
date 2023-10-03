import {
  createRouter,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router'
import Api from '@/api'
import Http404 from '@/views/Http404.vue'
import HomeView from '@/views/HomeView.vue'
import AuthView from '@/views/Auth/AuthView.vue'
import TodoSubview from '@/views/Todo/Subview.vue'
import UserSubview from '@/views/UserSubview.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: {
      name: 'todos'
    },
    children: [
      {
        name: 'users',
        path: 'users',
        component: UserSubview,
      }, {
        name: 'todos',
        path: '/todos',
        component: TodoSubview,
      }
    ],
  }, {
    path: '/login',
    name: 'login',
    component: AuthView
  }, {
    path: '/:catchAll(.*)',
    component: Http404
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async to => {
  const me = await Api.user.me()
  if (me) {
    if (to.name === 'login') {
      return { name: 'home' }
    }
  } else {
    if (to.name !== 'login') {
      return { name: 'login' }
    }
  }
  console.log(me, to)
  return true
})

export default router
