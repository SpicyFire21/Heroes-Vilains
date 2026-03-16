import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useSecretStore = defineStore('secret', () =>{
  //state
  const secret = ref("zebi")
  //getter


  //mutation
  const setSecret = (data) => {
    secret.value = data;
  }




  //action




  return {
    //state
    secret,
    //getter

    //mutation
    setSecret,

    //action


  }
})
