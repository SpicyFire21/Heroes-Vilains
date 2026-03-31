import heroesService from '@/services/heroes.services.js'
import {defineStore} from 'pinia'
import {ref} from 'vue'


export const useHeroesStore = defineStore('heroes', () => {
  //state
  const heroes = ref([])
  const currentHero = ref(null)
  //getter
  const getHeroById = (id) =>{
    console.log(id)
    return heroes.value.find(h => h._id === id)
  }

  //mutation
  const setHeroes = (data) => {
    heroes.value = data;

  };
  const setHero = (data) => {
    currentHero.value = data;

  };
  const addHero = (data) => {
    heroes.value.push(data)
  }


  //action
  const getHeroes = async () => {
    try {

      let response = await heroesService.getHeroes();
      if (response.error === 0) {
        setHeroes(response.data);

      }
    } catch (error) {
      console.error('store.js | Erreur lors de la récupération de héroes:', error);
    }
  }
  const createHero = async (data) => {
    try {

      let response = await heroesService.createHero(data);
      if (response.error === 0) {
        addHero(response.data);

      }
    } catch (error) {
      console.error('store.js | Erreur lors de la création du héro:', error);
    }
  }

  const getProfileByLogin = async (login) => {
    try {

      let response = await heroesService.getProfileByLogin(login);
      console.log(response)
      if (response.error === 0) {
        setHero(response.data.hero);

      }
    } catch (error) {
      console.error('store.js | Erreur lors de la récupération du héro:', error);
    }
  }
  // pour le profile
  const updateHero = async (data)=>{
    try {

      let response = await heroesService.updateHero(data)
      console.log(response)
      if (response.error === 0) {
        setHero(response.data);

      }
    } catch (error) {
      console.error('store.js | Erreur lors de la modification du héro:', error);
    }
  }

  //modifier un héro
  const editHero = async (data)=>{
    try {

      let response = await heroesService.editHero(data)
      console.log(response)
      if (response.error === 0) {
        // setHero(response.data);

      }
    } catch (error) {
      console.error('store.js | Erreur lors de la modification du héro:', error);
    }
  }

  return {
    //state
    heroes,
    currentHero,
    //getter
    getHeroById,
    //mutation
    setHeroes,
    setHero,

    //action
    getHeroes,
    createHero,
    getProfileByLogin,
    updateHero

  }
})
