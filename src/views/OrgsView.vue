<template>
  <v-container>
    <!-- Bouton création -->
    <v-row class="mb-4">
      <v-col>
        <v-btn color="primary" @click="dialog = true">
          créé une organisation
        </v-btn>
      </v-col>
    </v-row>

    <!-- Liste des organisations -->
    <v-data-table
      :headers="headers"
      :items="orgStore.orgs"
      item-key="id"
      @click:row="selectOrg"
    >
      <template #item.actions="{ item }">
        <v-btn size="small" @click.stop="selectOrg(item)">
          Voir
        </v-btn>
      </template>
    </v-data-table>

    <!-- Dialog création -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>
          Créer une organisation
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="newOrg.name"
            label="Nom"
            required
          />
          <v-text-field
            v-model="newOrg.secret"
            label="Mot de passe"
            type="password"
            required
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="cancelCreate">
            Annuler
          </v-btn>
          <v-btn color="primary" @click="createOrg">
            Valider
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useOrganizationStore } from '@/stores'

const orgStore = useOrganizationStore()
const router = useRouter()

const dialog = ref(false)

const newOrg = ref({
  name: '',
  secret: ''
})

const headers = [
  { title: 'Nom', key: 'name' },
  { title: 'Actions', key: 'actions', sortable: false }
]

onMounted(async () => {
  await orgStore.getOrganizations()
})

const selectOrg = async (org) => {
  const id = org._id
  const secret = orgStore.secret;
  console.log(secret)
  await orgStore.getOrganizationById(id,secret)
  await router.push(`/orgs/${id}`)
}

const createOrg = async () => {
  await orgStore.createOrganization(newOrg.value)
  dialog.value = false
  newOrg.value = { name: '', secret: '' }
  await orgStore.getOrganizations()
}

const cancelCreate = () => {
  dialog.value = false
  newOrg.value = { name: '', secret: '' }
}
</script>

<style scoped>
</style>
