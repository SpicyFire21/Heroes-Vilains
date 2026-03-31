<template>
  <v-container>
    <v-progress-linear v-if="loading" indeterminate class="mb-4" />

    <v-card v-else-if="org">
      <v-card-title>{{ org.name }}</v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <strong>ID :</strong> {{ org._id }}
          </v-col>

          <v-col cols="12">
            <div class="d-flex align-center justify-space-between mb-2">
              <strong>Équipe(s)</strong>
              <v-btn
                size="small"
                color="primary"
                prepend-icon="mdi-plus"
                @click="openAddTeamPanel"
              >
                Ajouter une équipe
              </v-btn>
            </div>

            <v-expand-transition>
              <v-card v-if="showAddTeamPanel" variant="outlined" class="mb-3 pa-3">
                <v-select
                  v-model="selectedTeamToAdd"
                  :items="recruitableTeams"
                  item-title="name"
                  item-value="_id"
                  label="Choisir une équipe"
                  return-object
                />
                <div class="d-flex gap-2 mt-2">
                  <v-btn
                    color="primary"
                    :disabled="!selectedTeamToAdd"
                    @click="addTeamToOrg"
                  >
                    Valider
                  </v-btn>
                  <v-btn variant="text" @click="closeAddTeamPanel">Annuler</v-btn>
                </div>
              </v-card>
            </v-expand-transition>

            <v-list v-if="org.teams && org.teams.length" density="compact">
              <v-list-item v-for="team in org.teams" :key="team._id">
                <v-list-item-title v-if="team._id">{{ teamStore.getTeamById(team._id).name }}</v-list-item-title>
                <v-list-item-title v-if="team.idTeam">{{ teamStore.getTeamById(team.idTeam).name }}</v-list-item-title>


                <template #append>
                  <v-btn size="small" class="mr-1" @click="openTeam(team)">Voir</v-btn>
                  <v-btn size="small" color="error" @click="openDeleteDialog(team)">Supprimer</v-btn>
                </template>
              </v-list-item>
            </v-list>

            <div v-else class="text-grey">Aucune équipe</div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-alert v-else type="error" variant="tonal">
      Organisation introuvable
    </v-alert>
  </v-container>

  <custom-dialog
    v-model="showDeleteDialog"
    title="Supprimer l'équipe"
    :data="selectedTeam"
    @confirm="deleteTeam"
  >
    Cette action est définitive.
    <template #actions>
      <v-btn variant="text" @click="closeDeleteDialog">Annuler</v-btn>
      <v-btn color="error" @click="deleteTeam">Supprimer</v-btn>
    </template>
  </custom-dialog>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOrganizationStore, useSecretStore, useTeamsStore } from '@/stores'
import CustomDialog from "@/components/CustomDialog.vue"

const router   = useRouter()
const route    = useRoute()
const orgStore = useOrganizationStore()
const teamStore = useTeamsStore()
const secretStore = useSecretStore()

const loading           = ref(true)
const showDeleteDialog  = ref(false)
const selectedTeam      = ref(null)
const showAddTeamPanel  = ref(false)
const selectedTeamToAdd = ref(null)

const org = computed(() => orgStore.currentOrg)

const recruitableTeams = computed(() => {
  if (!org.value) return teamStore.teams
  const orgTeamIds = (org.value.teams || []).map(t => t._id)
  return teamStore.teams.filter(t => !orgTeamIds.includes(t._id))
})

onMounted(async () => {
  loading.value = true
  await orgStore.getOrganizationById(route.params.id, secretStore.secret)
  await teamStore.getTeams()
  loading.value = false
})

function openDeleteDialog(team) {
  selectedTeam.value = team
  showDeleteDialog.value = true
}
function closeDeleteDialog() {
  showDeleteDialog.value = false
}
async function deleteTeam() {
  await orgStore.removeTeamFromOrg({ idTeam: selectedTeam.value._id })
  showDeleteDialog.value = false
}

function openAddTeamPanel() {
  selectedTeamToAdd.value = null
  showAddTeamPanel.value = true
}
function closeAddTeamPanel() {
  showAddTeamPanel.value = false
  selectedTeamToAdd.value = null
}
async function addTeamToOrg() {
  if (!selectedTeamToAdd.value) return
  await orgStore.addTeamToOrg({ idTeam: selectedTeamToAdd.value._id })
  closeAddTeamPanel()
}

async function openTeam(team) {
  teamStore.setTeam(team)
  await router.push(`/teams/${team._id}`)
}
</script>
