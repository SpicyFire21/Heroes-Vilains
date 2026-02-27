<template>
  <v-container>
    <!-- Chargement -->
    <v-progress-linear
      v-if="loading"
      indeterminate
      class="mb-4"
    />

    <!-- Organisation -->
    <v-card v-else-if="org">
      <v-card-title>
        {{ org.name }}
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <strong>ID :</strong> {{ org._id }}
          </v-col>



          <v-col cols="12">
            <strong>Équipe(s)</strong>

            <v-list
              v-if="org.teams && org.teams.length"
              density="compact"
            >
              <v-list-item
                v-for="team in org.teams"
                :key="team._id"
              >
                <v-list-item-title>
                  {{ team.name }}
                </v-list-item-title>
                <v-btn @click="openTeam(team)">
                  voir
                </v-btn>
                <v-btn @click="openDeleteDialog(team)">
                  supprimer
                </v-btn>
              </v-list-item>
            </v-list>

            <div v-else>
              Aucune équipe
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Erreur -->
    <v-alert
      v-else
      type="error"
      variant="tonal"
    >
      Organisation introuvable
    </v-alert>
  </v-container>

  <custom-dialog
    v-model="showDeleteDialog"
    title="Supprimer l’équipe"
    :data="selectedTeam"
    @confirm="deleteTeam"
  >
    Cette action est définitive.

    <template #actions>
      <v-btn variant="text" @click="closeDeleteDialog">
        annuler
      </v-btn>

      <v-btn color="error" @click="deleteTeam">
        supprimer
      </v-btn>
    </template>
  </custom-dialog>

</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useOrganizationStore, useSecretStore, useTeamsStore} from '@/stores'
import CustomDialog from "@/components/CustomDialog.vue";

const router = useRouter()

const route = useRoute()
const orgStore = useOrganizationStore()
const teamStore = useTeamsStore()
const secretStore = useSecretStore()

const loading = ref(true)
const showDeleteDialog = ref(false)
const selectedTeam = ref(null)

const org = computed(() => orgStore.currentOrg)

onMounted(async () => {
  loading.value = true
  await orgStore.getOrganizationById(route.params.id,secretStore.secret)
  loading.value = false
})

function openDeleteDialog(team){
  showDeleteDialog.value = true;
  selectedTeam.value = team;
}
function closeDeleteDialog(){
  showDeleteDialog.value = false;
}

async function deleteTeam(){
  console.log(selectedTeam.value._id)
  await orgStore.removeTeamFromOrg({idTeam:selectedTeam.value._id},secretStore.secret)
  showDeleteDialog.value = false
}

async function openTeam(team){
console.log(team)
  teamStore.setTeam(team)
  console.log(teamStore.currentTeam)
  await router.push(`/teams/${team._id}`)

}


</script>

<style scoped>
</style>
