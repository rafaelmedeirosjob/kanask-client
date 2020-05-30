import Vue from 'vue'
import Router from 'vue-router'
import Kanban from '@/pages/Kanban'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'kanban',
      component: Kanban,
      children: [
        {
            path: 'kanban',
            name: 'kanban',
            component: () => import('./pages/Kanban.vue')
          }
        ]
    }
  ]
})