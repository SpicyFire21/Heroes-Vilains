<template>
  <v-app>
    <!-- Bandeau haut -->
    <v-app-bar flat>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>Heroes & Vilains</v-toolbar-title>
      <v-spacer />
      <v-btn variant="outlined" @click="goSecret">
        Secret
      </v-btn>
      <v-btn variant="outlined" @click="goAuth">
        Login
      </v-btn>
    </v-app-bar>

    <!-- Menu tiroir -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
    >
      <v-list nav>
        <v-list-item
          title="Organisations"
          prepend-icon="mdi-domain"
          @click="go('/orgs')"
        />
        <v-list-item
          title="Équipes"
          prepend-icon="mdi-account-group"
          @click="go('/teams')"
        />
        <v-list-item
          title="Héros"
          prepend-icon="mdi-account"
          @click="go('/heroes')"
        />
      </v-list>
    </v-navigation-drawer>

    <!-- Contenu principal -->
    <v-main>
      <v-container fluid>
        <router-view />
        <ErrorDialog/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ErrorDialog from "@/components/ErrorDialog.vue";

const drawer = ref(false)
const router = useRouter()

const go = (path) => {
  drawer.value = false
  router.push(path)
}

const goAuth = () => {
  router.push('/auth')
}

const goSecret = () => {
  router.push('/secret')
}
</script>
