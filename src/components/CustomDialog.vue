<template>
  <v-dialog
    v-model="model"
    :max-width="maxWidth"
    :persistent="persistent"
  >
    <v-card>
      <!-- Header -->
      <v-card-title v-if="$slots.title || title">
        <slot name="title">
          {{ title }}
        </slot>
      </v-card-title>

      <!-- Content -->
      <v-card-text>
        {{data}}
        <slot />
      </v-card-text>

      <!-- Actions -->
      <v-card-actions v-if="$slots.actions">
        <v-spacer />
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  maxWidth: {
    type: [Number, String],
    default: 500
  },
  persistent: {
    type: Boolean,
    default: false
  },
  data:{
    type:Object
  }
})

const model = defineModel({ type: Boolean })
</script>
