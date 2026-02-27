<template>
  <v-container>
    <!-- Bouton création -->
    <v-row class="mb-4">
      <v-col>
        <v-btn color="primary" @click="dialog = true">
          créé une équipe
        </v-btn>
      </v-col>
    </v-row>

    <!-- Liste des organisations -->
    <v-data-table
      :headers="headers"
      :items="teamStore.teams"
      item-key="id"
      @click:row="selectTeam"
    >

    </v-data-table>

    <!-- Dialog création -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>
          Créer une équipe
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="newTeam.name"
            label="Nom"
            required
          />

        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="cancelCreate">
            Annuler
          </v-btn>
          <v-btn color="primary" @click="createTeam">
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
import { useTeamsStore} from '@/stores'

const teamStore = useTeamsStore()
const router = useRouter()

const dialog = ref(false)

const newTeam = ref({
  name: ''
})

const headers = [
  { title: 'Nom', key: 'name' },
  { title: 'Actions', key: 'actions', sortable: false }
]

onMounted(async () => {
  await teamStore.getTeams()
})

const selectTeam = async (team) => {

}

const createTeam = async () => {
  await teamStore.createTeam(newTeam.value)
  dialog.value = false
  newTeam.value = { name: '' }
  await teamStore.getTeams()
}

const cancelCreate = () => {
  dialog.value = false
  teamStore.value = { name: '' }
}
</script>

<style scoped>
</style>
