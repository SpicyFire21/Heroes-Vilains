<template>
  <v-dialog v-model="model" max-width="500">
    <v-card>
      <v-card-title class="text-h6">
        {{ errorStore.title }}
      </v-card-title>

      <v-card-text>
        {{ errorStore.message }}
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" variant="text" @click="close">
          Fermer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from 'vue'
import {useErrorStore} from "@/stores/index.js";


const errorStore = useErrorStore()

const model = computed({
  get: () => errorStore.show,
  set: (val) => {
    if (!val) errorStore.clearError()
  }
})

function close() {
  errorStore.clearError()
}
</script>
