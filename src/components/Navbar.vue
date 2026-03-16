<template>
  <v-app-bar flat>
    <v-app-bar-nav-icon @click="toggleDrawer" />
    <v-toolbar-title>Heroes & Vilains</v-toolbar-title>
    <v-spacer />
    <v-btn variant="outlined" @click="goTo('/secret')">
      Secret
    </v-btn>
    <v-btn variant="outlined" v-if="authstore.xsrfToken">
      profil
    </v-btn>
    <v-btn variant="outlined" @click="goTo('/auth')">
      Login
    </v-btn>
  </v-app-bar>
</template>

<script setup>

import {useRouter} from "vue-router";
import {ref} from "vue";
import {useAuthStore, useLayoutStore} from "@/stores/index.js";

const router = useRouter()
const layoutStore = useLayoutStore();
const authstore = useAuthStore()


const goTo = (path) => {
  router.push(path)
}

const toggleDrawer = () => {
  layoutStore.updateDrawer(!layoutStore.drawer)
}

</script>


<style scoped>

</style>
