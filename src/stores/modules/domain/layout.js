import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useLayoutStore = defineStore('layout', () =>{
  //state
  const drawer = ref(false)
  //getter


  //mutation
  const updateDrawer = (data) => {
    drawer.value = data
  }




  //action



  return {
    //state
    drawer,
    //getter

    //mutation
    updateDrawer

    //action


  }
})
