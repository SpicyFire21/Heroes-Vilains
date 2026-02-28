import { defineStore } from 'pinia'
import { ref } from 'vue'
import {useErrorStore} from "@/stores/index.js";
import authService from "@/services/auth.service.js";


export const useAuthStore = defineStore('auth', () =>{
  //state
  const xsrfToken = ref(null)
  //getter


  //mutation
  const updateXSRFToken = (data) => {
    xsrfToken.value = data
  }




  //action
  const login = async (data) => {
    try {
      let response = await authService.login(data)
      if (response.error === 0){
        updateXSRFToken(response.data.xsrfToken)
        console.log(xsrfToken.value)
      }
      return response;
    } catch (e) {
      console.error(e)
      useErrorStore().setError(e)
    }
  }



  return {
    //state
    xsrfToken,
    //getter

    //mutation


    //action
    login,

  }
})
