import { createRouter, createWebHistory } from 'vue-router'

import SecretView from '@/views/SecretView.vue'
import OrgsView from '@/views/OrgsView.vue'
import TeamsView from '@/views/TeamsView.vue'
import currentOrgView from '@/views/currentOrgView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/auth'
        },

        {
            path: '/secret',
            name: 'secret',
            component: SecretView
        },

        {
            path: '/orgs',
            name: 'orgs',
            component: OrgsView
        },
      {

        path:'/orgs/:id',
        name:'currentOrg',
        component: currentOrgView
      },


        {
            path: '/teams',
            name: 'teams',
            component: TeamsView
        }
    ]
})

export default router
