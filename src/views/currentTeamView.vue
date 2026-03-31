<template>
  <v-container>
    <v-progress-linear v-if="loading" indeterminate class="mb-4" />

    <v-card v-else-if="teamStore.currentTeam">
      <v-card-title class="d-flex align-center justify-space-between">
        {{ teamStore.currentTeam.name }}
        <v-btn
          size="small"
          color="primary"
          prepend-icon="mdi-plus"
          @click="openAddMemberPanel"
        >
          Ajouter un membre
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-expand-transition>
          <v-card v-if="showAddPanel" variant="outlined" class="mb-4 pa-3">
            <v-tabs v-model="addTab">
              <v-tab value="existing">Héro existant</v-tab>
              <v-tab value="new">Nouveau héro</v-tab>
            </v-tabs>

            <v-window v-model="addTab" class="mt-3">
              <v-window-item value="existing">
                <v-select
                  v-model="heroToAdd"
                  :items="heroesStore.heroes"
                  item-title="publicName"
                  item-value="_id"
                  label="Choisir un héro"
                  return-object
                />
                <div class="d-flex gap-2 mt-2">
                  <v-btn color="primary" :disabled="!heroToAdd" @click="addExistingHero">Valider</v-btn>
                  <v-btn variant="text" @click="closeAddPanel">Annuler</v-btn>
                </div>
              </v-window-item>

              <v-window-item value="new">
                <v-text-field v-model="newHero.publicName" label="Nom public" required />
                <v-text-field v-model="newHero.realName" label="Nom réel" />
                <v-btn size="small" color="secondary" @click="addPower">+ Pouvoir</v-btn>

                <v-row v-for="(power, i) in newHero.powers" :key="i" class="mt-1">
                  <v-col cols="4"><v-text-field v-model="power.name" label="Pouvoir" dense /></v-col>
                  <v-col cols="3"><v-text-field v-model.number="power.type" label="Type" type="number" min="1" max="7" dense /></v-col>
                  <v-col cols="3"><v-text-field v-model.number="power.level" label="Niveau" type="number" min="0" max="100" dense /></v-col>
                  <v-col cols="2"><v-btn icon="mdi-delete" color="red" size="small" @click="removePower(i)" /></v-col>
                </v-row>

                <div class="d-flex gap-2 mt-2">
                  <v-btn color="primary" :disabled="!newHero.publicName" @click="createAndAddHero">Créer & Ajouter</v-btn>
                  <v-btn variant="text" @click="closeAddPanel">Annuler</v-btn>
                </div>
              </v-window-item>
            </v-window>
          </v-card>
        </v-expand-transition>

        <div v-if="teamStore.currentTeam.members.length">
          <v-card
            v-for="hero in teamStore.currentTeam.members"
            :key="hero"
            variant="outlined"
            class="mb-2 pa-2"
          >
            <div class="d-flex align-center justify-space-between">
              <div>
                <strong>{{ heroesStore.getHeroById(hero)?.publicName }}</strong>
                <span v-if="hero.realName" class="text-grey ml-2">({{ hero.realName }})</span>
              </div>
              <div>
                <v-btn size="small" class="mr-1" @click="openEditDialog(hero)">Modifier</v-btn>
                <v-btn size="small" color="error" @click="openRemoveDialog(hero)">Retirer</v-btn>
              </div>
            </div>

            <!-- Pouvoirs -->
            <div v-if="hero.powers && hero.powers.length" class="mt-1">
              <v-chip
                v-for="p in hero.powers"
                :key="p._id"
                size="small"
                class="mr-1 mt-1"
              >
                {{ p.name }} — {{ powerTypeName(p.type) }} Niv.{{ p.level }}
              </v-chip>
            </div>
          </v-card>
        </div>
        <div v-else class="text-grey">Aucun membre</div>
      </v-card-text>
    </v-card>

    <v-alert v-else type="error" variant="tonal">Équipe introuvable</v-alert>
  </v-container>

  <custom-dialog
    v-model="showEditDialog"
    :title="editingHero ? `Modifier ${heroesStore.getHeroById(editingHero)?.publicName}` : ''"
    :max-width="600"
  >
    <template v-if="editingHero">
      <v-text-field v-model="heroesStore.getHeroById(editingHero).publicName" label="Nom public" />
      <v-text-field v-model="heroesStore.getHeroById(editingHero).realName" label="Nom réel" />
      <v-btn size="small" color="secondary" class="mb-2" @click="addEditPower">+ Pouvoir</v-btn>
      <v-row v-for="(p, i) in heroesStore.getHeroById(editingHero).powers" :key="i" class="mt-1">
        <v-col cols="4"><v-text-field v-model="p.name" label="Pouvoir" density="compact" /></v-col>
        <v-col cols="3"><v-text-field v-model.number="p.type" label="Type" type="number" min="1" max="7" density="compact" /></v-col>
        <v-col cols="3"><v-text-field v-model.number="p.level" label="Niveau" type="number" min="0" max="100" density="compact" /></v-col>
        <v-col cols="2"><v-btn icon="mdi-delete" color="red" size="small" @click="removeEditPower(i)" /></v-col>
      </v-row>
    </template>

    <template #actions>
      <v-btn variant="text" @click="showEditDialog = false">Annuler</v-btn>
      <v-btn color="primary" @click="confirmEditHero">Valider</v-btn>
    </template>
  </custom-dialog>

  <custom-dialog
    v-model="showRemoveDialog"
    title="Retirer le membre"
    data=""
  >
    Confirmer le retrait de <strong>{{heroesStore.getHeroById(selectedMember)?.publicName }}</strong> de l'équipe ?
    <template #actions>
      <v-btn variant="text" @click="showRemoveDialog = false">Annuler</v-btn>
      <v-btn color="error" @click="confirmRemoveMember">Retirer</v-btn>
    </template>
  </custom-dialog>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTeamsStore, useHeroesStore } from '@/stores'
import CustomDialog from "@/components/CustomDialog.vue"

const router      = useRouter()
const teamStore   = useTeamsStore()
const heroesStore = useHeroesStore()

const loading = ref(false)

const showAddPanel = ref(false)
const addTab       = ref('existing')
const heroToAdd    = ref(null)
const editingHero    = ref(null)
const newHero      = ref({ _id:editingHero,publicName: '', realName: '', powers: [] })

const showEditDialog = ref(false)


const showRemoveDialog = ref(false)
const selectedMember   = ref(null)

const POWER_TYPES = ['', 'Force', 'Vitesse', 'Endurance', 'Magie', 'Effrayant', 'Furtivité', 'Stupidité']
const powerTypeName = (type) => POWER_TYPES[type] || type

async function loadMembers() {
  console.log(teamStore.currentTeam)
  loading.value = true

  loading.value = false
}

onMounted(async () => {
  if (!teamStore.currentTeam) {
    await router.push({ name: 'teams' })
    return
  }
  await heroesStore.getHeroes()
  await loadMembers()
})

function openAddMemberPanel() {
  heroToAdd.value = null
  newHero.value = { publicName: '', realName: '', powers: [] }
  showAddPanel.value = true
}
function closeAddPanel() { showAddPanel.value = false }

async function addExistingHero() {
  if (!heroToAdd.value) return
  await teamStore.addHeroesToTeam({ idHeroes: [heroToAdd.value._id], idTeam: teamStore.currentTeam._id })
  await loadMembers()
  closeAddPanel()
}

const addPower    = () => newHero.value.powers.push({ name: '', type: 1, level: 1 })
const removePower = (i) => newHero.value.powers.splice(i, 1)

async function createAndAddHero() {
  await heroesStore.createHero(newHero.value)
  const created = heroesStore.heroes.at(-1)
  if (created) {
    await teamStore.addHeroesToTeam({ idHeroes: [created._id], idTeam: teamStore.currentTeam._id })
    await loadMembers()
  }
  closeAddPanel()
}

function openEditDialog(hero) {
  editingHero.value = JSON.parse(JSON.stringify(hero))  // deep clone
  showEditDialog.value = true
}
const addEditPower    = () => editingHero.value.powers.push({ name: '', type: 1, level: 1 })
const removeEditPower = (i) => editingHero.value.powers.splice(i, 1)

async function confirmEditHero() {
  await heroesStore.updateHero(editingHero.value)
  await loadMembers()
  showEditDialog.value = false
}

function openRemoveDialog(hero) {
  selectedMember.value   = hero
  showRemoveDialog.value = true
}
async function confirmRemoveMember() {
  await teamStore.removeHeroesFromTeam({ idHeroes: [selectedMember.value], idTeam: teamStore.currentTeam._id })
  await loadMembers()
  showRemoveDialog.value = false
}
</script>
