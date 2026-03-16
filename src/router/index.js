import {createRouter, createWebHistory} from 'vue-router'

import SecretView from '@/views/SecretView.vue'
import OrgsView from '@/views/OrgsView.vue'
import TeamsView from '@/views/TeamsView.vue'
import currentOrgView from '@/views/currentOrgView.vue'
import currentTeamView from "@/views/currentTeamView.vue";
import {useSecretStore} from "@/stores/index.js";
import LoginView from "@/views/LoginView.vue";
import HeroesView from "@/views/HeroesView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/secret',
      name: 'secret',
      component: SecretView
    },
    {
      path: '/auth',
      name: 'auth',
      component: LoginView
    },
    {
      path: '/orgs',
      name: 'orgs',
      component: OrgsView
    },
    {

      path: '/orgs/:id',
      name: 'currentOrg',
      component: currentOrgView,
      meta: { requiresSecret: true }
    },
    {
      path: '/heroes',
      name: 'heroes',
      component: HeroesView
    },

    {
      path: '/teams',
      name: 'teams',
      component: TeamsView
    },
    {

      path: '/teams/:id',
      name: 'currentTeam',
      component: currentTeamView,
      meta: { requiresSecret: true }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/orgs'
    }
  ]
})


router.beforeEach((to, from, next) => {
  const secretStore = useSecretStore()

  if (to.meta.requiresSecret && !secretStore.secret) {
    next('/secret')
  } else {
    next()
  }
})

export default router
