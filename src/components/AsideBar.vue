<template>
  <v-navigation-drawer
    v-model="layoutStore.drawer"
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
</template>

<script setup>

import {ref} from "vue";
import {useRouter} from "vue-router";
import {useLayoutStore} from "@/stores/index.js";

const layoutStore = useLayoutStore()
const router = useRouter()
const go = (path) => {
  layoutStore.updateDrawer(false)
  router.push(path)
}
</script>

<style scoped>

</style>
