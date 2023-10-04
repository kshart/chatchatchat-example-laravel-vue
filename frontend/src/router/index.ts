import {
  createRouter,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router'
import Api from '@/api'
import Http404 from '@/views/Http404.vue'
import Home from '@/views/Home.vue'
import Auth from '@/views/auth/Auth.vue'
import Todos from '@/views/todos/Todos.vue'
import Users from '@/views/users/Users.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: {
      name: 'todos'
    },
    children: [
      {
        name: 'users',
        path: 'users',
        component: Users,
      }, {
        name: 'todos',
        path: '/todos',
        component: Todos,
      }
    ],
  }, {
    path: '/login',
    name: 'login',
    component: Auth
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
