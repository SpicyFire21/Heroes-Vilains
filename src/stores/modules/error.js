import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useErrorStore = defineStore('error', () => {
  const show = ref(false)
  const title = ref('Erreur')
  const message = ref(null)

  function setError(payload) {
    if (typeof payload === 'string') {
      message.value = payload
    } else if (payload?.response?.data?.data) {
      message.value = payload.response.data.data
    } else if (payload?.message) {
      message.value = payload.message
    } else {
      message.value = 'Une erreur est survenue'
    }

    show.value = true
  }

  function clearError() {
    show.value = false
    message.value = null
  }

  return {
    //state
    show,
    title,
    message,

    //mutation
    setError,
    clearError
  }
})
