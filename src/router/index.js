import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TodoList from '../views/TodoList.vue'
import IssueList from '../views/IssueList.vue'
import TodoIssues from '../views/TodoIssues.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/todo-list',
    name: 'todo',
    component: TodoList
  },
  {
    path: '/issue-list',
    name: 'issues',
    component: IssueList
  },
  {
    path: '/todo-issues',
    name: 'todo-issues',
    component: TodoIssues
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
