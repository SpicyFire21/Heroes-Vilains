<template>
  <v-app>
    <!-- Bandeau haut -->
    <Navbar/>

    <!-- Menu tiroir -->
    <AsideBar/>

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
import ErrorDialog from "@/components/ErrorDialog.vue";
import Navbar from "@/components/Navbar.vue";
import AsideBar from "@/components/AsideBar.vue";

</script>
