<template>
  <v-container>
    <!-- Bouton création -->
    <v-row class="mb-4">
      <v-col>
        <v-btn color="primary" @click="dialog = true">
          créé un héro
        </v-btn>
      </v-col>
    </v-row>

    <!-- Liste des héroes -->
    <v-data-table
      :headers="headers"
      :items="heroesStore.heroes"
      item-key="_id"
    >
    </v-data-table>

    <!-- Dialog création -->
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title>
          Créer un héro
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="newHero.publicName"
            label="Nom public"
            required
          />
          <v-text-field
            v-model="newHero.realName"
            label="Nom réel"
          />

          <v-divider class="my-4"/>

          <v-btn size="small" color="secondary" @click="addPower">
            Ajouter un pouvoir
          </v-btn>

          <v-row v-for="(power, index) in newHero.powers" :key="index" class="mt-2">
            <v-col cols="4">
              <v-text-field v-model="power.name" label="Pouvoir"/>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model.number="power.type" min="0" max="7" label="Type" type="number"/>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model.number="power.level" min="0" max="100" label="Level" type="number"/>
            </v-col>
            <v-col cols="2">
              <v-btn icon="mdi-delete" color="red" @click="removePower(index)"/>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer/>
          <v-btn variant="text" @click="cancelCreate">Annuler</v-btn>
          <v-btn color="primary" @click="createHero">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useHeroesStore } from '@/stores'

const heroesStore = useHeroesStore()
const router = useRouter()

const dialog = ref(false)

const newHero = ref({
  publicName: '',
  realName: '',
  powers: []
})

const addPower = () => {
  newHero.value.powers.push({ name: '', type: 0, level: 1 })
}

const removePower = (index) => {
  newHero.value.powers.splice(index, 1)
}

const headers = [
  { title: 'Nom', key: 'publicName' }
]

onMounted(async () => {
  await heroesStore.getHeroes()
})

const createHero = async () => {
  await heroesStore.createHero(newHero.value)
  dialog.value = false
  newHero.value = { publicName: '', realName: '', powers: [] }
}

const cancelCreate = () => {
  dialog.value = false
  newHero.value = { publicName: '', realName: '', powers: [] }
}
</script>
