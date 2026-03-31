import {deleteRequest, getRequest, patchRequest, postRequest} from "@/services/axios.service";

async function getOrganizationsFromAPI(){

    return getRequest("/herocorp/orgs/get","GET-ORGS");
}
async function getOrganizations(){
    let response = null;

    try {
        // response = await loginUserFromLocalSource(data);
        response = await getOrganizationsFromAPI();
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de récupérer les organizations'  }
    }
    return response
}

async function getOrganizationByIdFromAPI(id,secret){

  return getRequest(`/herocorp/orgs/getbyid/${id}?org-secret=${secret}`,"GET-ORG-BY-ID");
}
async function getOrganizationById(id,secret){
  let response = null;

  try {
    // response = await loginUserFromLocalSource(data);
    response = await getOrganizationByIdFromAPI(id,secret);
  }
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de récupérer l\'organizations'  }
  }
  return response
}



async function createOrganizationFromAPI(data){

  return postRequest(`/herocorp/orgs/create`,data,"GET-ORG-BY-ID");
}
async function createOrganization(data){
  let response = null;

  try {
    // response = await loginUserFromLocalSource(data);
    response = await createOrganizationFromAPI(data);
  }
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de créé l\'organizations'  }
  }
  return response
}

async function removeTeamFromAPI(data){
  return patchRequest(`/herocorp/orgs/removeteam`,data,"DELETE-TEAM-FROM-ORG");
}
async function removeTeam(data){
  let response = null;

  try {
    response = await removeTeamFromAPI(data);
  }
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de supprimer l\'équipe de l\'organizations'  }
  }
  return response
}


async function addTeamFromAPI(data){
  return patchRequest(`/herocorp/orgs/addteam`,data,"ADD-TEAM-TO-ORG");
}
async function addTeam(data){
  let response = null;

  try {
    response = await addTeamFromAPI(data);
  }
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible d\'ajouter l\'équipe de l\'organizations'  }
  }
  return response
}


export default {
    getOrganizations,
    getOrganizationById,
  createOrganization,
  removeTeam,
  addTeam
}
