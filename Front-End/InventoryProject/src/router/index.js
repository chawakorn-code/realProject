import Vue from 'vue'
import Router from 'vue-router'
import Listmanagement from '@/components/Listmanagement'
import addNewItem from '@/components/addNewItem'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/management',
      name: 'Listmanagement',
      component: Listmanagement
    },
    {
      path: '/addNewitem',
      name: 'addNewItem',
      component: addNewItem
    }
  ]
})
