<template>
  <v-container>
    <v-progress-linear v-if="loading" indeterminate class="mb-4" />

    <template v-else-if="heroesStore.currentHero">
      <v-card>
        <v-card-title class="d-flex align-center justify-space-between">
          {{ heroesStore.currentHero.publicName }}
          <v-btn size="small" color="primary" @click="openEditDialog">Modifier</v-btn>
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <strong>Nom réel :</strong> {{ heroesStore.currentHero.realName || '—' }}
            </v-col>
            <v-col cols="12" md="6">
              <strong>Nom Publique :</strong> {{ heroesStore.currentHero.publicName}}
            </v-col>
          </v-row>

          <div class="mt-3" v-if="heroesStore.currentHero.powers?.length">
            <strong>Pouvoirs :</strong>
            <v-chip
              v-for="p in heroesStore.currentHero.powers"
              :key="p._id"
              class="mr-1 mt-1"
              size="small"
            >
              {{ p.name }} — {{ powerTypeName(p.type) }} Niv.{{ p.level }}
            </v-chip>
          </div>
        </v-card-text>
      </v-card>
    </template>

    <v-alert v-else type="warning" variant="tonal">
      Aucun profil chargé. Veuillez vous connecter.
    </v-alert>
  </v-container>

  <!-- Dialog modification (CustomDialog) -->
  <custom-dialog
    v-model="showEditDialog"
    title="Modifier mon profil"
    :max-width="600"
  >
    <template v-if="editingHero">
      <v-text-field v-model="editingHero.publicName" label="Nom public" />
      <v-text-field v-model="editingHero.realName" label="Nom réel" />
      <v-btn size="small" color="secondary" class="mb-2" @click="addPower">+ Pouvoir</v-btn>
      <v-row v-for="(p, i) in editingHero.powers" :key="i" class="mt-1">
        <v-col cols="4"><v-text-field v-model="p.name" label="Pouvoir" density="compact" /></v-col>
        <v-col cols="3"><v-text-field v-model.number="p.type" label="Type" type="number" min="1" max="7" density="compact" /></v-col>
        <v-col cols="3"><v-text-field v-model.number="p.level" label="Niveau" type="number" min="0" max="100" density="compact" /></v-col>
        <v-col cols="2"><v-btn icon="mdi-delete" color="red" size="small" @click="removePower(i)" /></v-col>
      </v-row>
    </template>

    <template #actions>
      <v-btn variant="text" @click="showEditDialog = false">Annuler</v-btn>
      <v-btn color="primary" @click="saveEdit">Enregistrer</v-btn>
    </template>
  </custom-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore, useHeroesStore } from "@/stores/index.js"
import CustomDialog from "@/components/CustomDialog.vue"

const heroesStore = useHeroesStore()
const authStore   = useAuthStore()

const loading        = ref(false)
const showEditDialog = ref(false)
const editingHero    = ref(null)

const POWER_TYPES = ['', 'Force', 'Vitesse', 'Endurance', 'Magie', 'Effrayant', 'Furtivité', 'Stupidité']
const powerTypeName = (type) => POWER_TYPES[type] || type

onMounted(async () => {
  if (!heroesStore.currentHero && authStore.xsrfToken) {
    loading.value = true
    // Le login est stocké dans le token ou dans le store auth
    // On recharge le profil si on a le token
    loading.value = false
  }
})

function openEditDialog() {
  const hero = heroesStore.currentHero?.hero || heroesStore.currentHero
  editingHero.value = JSON.parse(JSON.stringify(hero))
  showEditDialog.value = true
}

const addPower    = () => editingHero.value.powers.push({ name: '', type: 1, level: 1 })
const removePower = (i) => editingHero.value.powers.splice(i, 1)

async function saveEdit() {
  // authupdate : authentification via xsrf (intercepteur)
  await heroesStore.updateHero(editingHero.value)
  showEditDialog.value = false
}
</script>
