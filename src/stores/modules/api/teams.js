import teamsService from '@/services/teams.service.js'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useTeamsStore = defineStore('teams', () =>{
    //state
    const teams = ref([])
    const currentTeam = ref(null)
    //getter
    const getTeamById = (id) =>{
      const res = teams.value.find(t=>t._id === id)
      console.log(res)
      return res
    }

    //mutation
    const setTeams = (data) => {
        teams.value = data;

    };
    const setTeam = (data) => {
        currentTeam.value = data;

    };
    const addTeam = (data) =>{
      teams.value.push(data)
    }



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
  const createTeam = async (payload) =>{
    try {

      let response = await teamsService.createTeam(payload);
      if (response.error === 0) {
        addTeam(response.data);

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
      getTeamById,
        //mutation
        setTeams,
        setTeam,

        //action
        getTeams,
        createTeam
    }
})
