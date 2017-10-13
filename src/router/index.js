import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Mint from '@/components/Mint'
import Element from '@/components/Element'
import Message from '@/components/Message'
import Component from '@/vue-learning/Component'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/mint',
      name: 'Mint',
      component: Mint
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/element',
      name: 'Element',
      component: Element
    },
    {
      path: '/vue-learning/component',
      name: 'Component',
      component: Component
    }
  ]
})
