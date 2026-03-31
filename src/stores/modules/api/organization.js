import orgService from '@/services/organizations.service.js'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import {useErrorStore} from "@/stores/index.js";


export const useOrganizationStore = defineStore('organizations', () =>{
    //state
    const orgs = ref([])
    const currentOrg = ref(null)
    //getter


    //mutation
    const setOrgs = (data) => {
        orgs.value = data;

    };
    const setOrg = (data) => {
        currentOrg.value = data[0];
    };

    const pushOrg = (data) => {
      orgs.value.push(data)
    }
  const removeTeam = (obj) => {
    if (!currentOrg.value?.teams) return
    console.log(obj.idTeam)
    currentOrg.value.teams = currentOrg.value.teams.filter(t => t._id !== obj.idTeam)
  }
  const pushTeam = (team) => {
    if (!currentOrg.value) return
    if (!currentOrg.value.teams) currentOrg.value.teams = []
    currentOrg.value.teams.push(team)
  }


    //action
    const getOrganizations = async () =>{
        try {

            let response = await orgService.getOrganizations();

            if (response.error === 0) {
                setOrgs(response.data);

            }
        } catch (error) {
            console.error(error);
          useErrorStore().setError(error)
        }
    }

    const removeTeamFromOrg = async (teamid) =>{
      try {

        let response = await orgService.removeTeam(teamid);
        if (response.error === 0) {
          removeTeam(teamid)

          // sliceTeam(response.data);

        } else {
          console.warn(response.data)
        }

      } catch (error) {
        console.error(error);
        useErrorStore().setError(error)

      }
    }

  const addTeamToOrg = async (teamid) =>{
    try {

      let response = await orgService.addTeam(teamid);

      if (response.error === 0) {
        pushTeam(teamid)


      } else {
        console.warn(response.data)
      }

    } catch (error) {
      console.error(error);
      useErrorStore().setError(error)

    }
  }

    const getOrganizationById = async (id,secret) => {
      try {

        let response = await orgService.getOrganizationById(id,secret);

        if (response.error === 0) {
          setOrg(response.data);

        }

      } catch (error) {
        console.error(error);
        useErrorStore().setError(error)

      }
    }
    const createOrganization = async (data) => {
      try {

        let response = await orgService.createOrganization(data);

        if (response.error === 0) {
          pushOrg(response.data);

        }
      } catch (error) {
        console.error(error);
        useErrorStore().setError(error)

      }
    }


    return {
        //state
        orgs,
        currentOrg,

        //getter

        //mutation
        setOrgs,
        setOrg,


        //action
        getOrganizations,
        getOrganizationById,
        createOrganization,
        removeTeamFromOrg,
        addTeamToOrg
    }
})
