<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" md="4">
        <v-card>
          <v-card-title>
            Connectez vous
          </v-card-title>

          <v-card-text>
            <v-text-field
              v-model="user.login"
              label="login"
              type="password"
              required
            />
            <v-text-field
              v-model="user.password"
              label="mot de passe"
              type="password"
              required
            />

          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="login">
              Connexion
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {useAuthStore, useOrganizationStore, useSecretStore} from '@/stores'

const router = useRouter()
const orgStore = useOrganizationStore()
const authStore = useAuthStore()

const user = ref({
  login:"",
  password:""
})

const login = async () => {
  let res = await authStore.login(user.value)
  if(res.error === 0) {
    await router.push('/')
  }

}
</script>

<style scoped>
</style>
