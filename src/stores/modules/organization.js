import orgService from '@/services/organizations.service'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useOrganizationStore = defineStore('organizations', () =>{
    //state
    const orgs = ref([])
    const currentOrg = ref(null)
    const secret = ref(null)
    //getter


    //mutation
    const setOrgs = (data) => {
        orgs.value = data;

    };
    const setOrg = (data) => {
        currentOrg.value = data[0];
        console.log(currentOrg.value)
    };
    const setSecret = (data) => {
      secret.value = data;
    }
    const pushOrg = (data) => {
      orgs.value.push(data)
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
      }
    }


    return {
        //state
        orgs,
        currentOrg,
        secret,
        //getter

        //mutation
        setOrgs,
        setOrg,
      setSecret,

        //action
        getOrganizations,
        getOrganizationById,
      createOrganization
    }
})
