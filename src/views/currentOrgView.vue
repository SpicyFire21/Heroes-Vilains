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
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useOrganizationStore } from '@/stores'

const route = useRoute()
const orgStore = useOrganizationStore()

const loading = ref(true)

const org = computed(() => orgStore.currentOrg)

onMounted(async () => {
  loading.value = true
  await orgStore.getOrganizationById(route.params.id,orgStore.secret)
  loading.value = false
})
</script>

<style scoped>
</style>
