<template>
  <v-container>
    <!-- Organisation -->
    <v-card v-if="team" >
      <v-card-title>
        {{ team.name }}
        
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <strong>ID :</strong> {{ team._id }}
          </v-col>



          <v-col cols="12">
            <strong>Équipe(s)</strong>

            <v-list
              v-if="team.members && team.members.length"
              density="compact"
            >

              <v-list-item
                v-for="item in team.members"
                :key="item"
              >
                <v-list-item-title>
                  {{ item }}
                </v-list-item-title>
                <v-btn>
                  voir
                </v-btn>
                <v-btn @click="openDeleteDialog(item)">
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
      équipe introuvable
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
import { useTeamsStore} from '@/stores'
import CustomDialog from "@/components/CustomDialog.vue";

const route = useRoute()
const router = useRouter()

const teamStore = useTeamsStore()

const showDeleteDialog = ref(false)
const selectedTeam = ref(null)

const team = computed(() => teamStore.currentTeam)

function openDeleteDialog(team){
  showDeleteDialog.value = true;
  selectedTeam.value = team;
}
function closeDeleteDialog(){
  showDeleteDialog.value = false;
}

async function deleteTeam(){

  showDeleteDialog.value = false
}

onMounted(async()=>{
  if(!teamStore.currentTeam){
    await router.push({name: 'teams'})
  }
})

</script>

<style scoped>
</style>
