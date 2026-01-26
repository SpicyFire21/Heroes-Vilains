import heroesService from '@/services/heroes.services.js'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useHeroesStore = defineStore('heroes', () =>{
    //state
    const heroes = ref([])
    const currentHero = ref(null)
    //getter


    //mutation
    const setHeroes = (data) => {
        heroes.value = data;

    };
    const setHero = (data) => {
        currentHero.value = data;

    };




    //action
    const getHeroes = async () =>{
        try {

            let response = await heroesService.getHeroes();
            if (response.error === 0) {
                setHeroes(response.data);

            }
        } catch (error) {
            console.error('store.js | Erreur lors de la connexion:', error);
        }
    }



    return {
        //state
        heroes,
        currentHero,
        //getter

        //mutation
        setHeroes,
        setHero,

        //action
        getHeroes,

    }
})
