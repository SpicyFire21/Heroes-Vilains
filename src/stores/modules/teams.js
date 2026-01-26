import teamsService from '@/services/teams.service'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useTeamsStore = defineStore('teams', () =>{
    //state
    const teams = ref([])
    const currentTeam = ref(null)
    //getter


    //mutation
    const setTeams = (data) => {
        teams.value = data;

    };
    const setTeam = (data) => {
        currentTeam.value = data;

    };




    //action
    const getTeams = async () =>{
        try {

            let response = await teamsService.getTeams();
            if (response.error === 0) {
                setTeams(response.data);

            }
        } catch (error) {
            console.error('store.js | Erreur lors de la connexion:', error);
        }
    }



    return {
        //state
        teams,
        currentTeam,
        //getter

        //mutation
        setTeams,
        setTeam,

        //action
        getTeams
    }
})