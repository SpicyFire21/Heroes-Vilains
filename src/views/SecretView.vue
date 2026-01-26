<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" md="4">
        <v-card>
          <v-card-title>
            Phrase secrète
          </v-card-title>

          <v-card-text>
            <v-text-field
              v-model="secret"
              label="Phrase secrète"
              type="password"
              required
            />
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="saveSecret">
              Valider
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
import { useOrganizationStore } from '@/stores'

const router = useRouter()
const orgStore = useOrganizationStore()

const secret = ref('')

const saveSecret = () => {
  orgStore.setSecret(secret.value)
  router.push('/orgs')
}
</script>

<style scoped>
</style>
