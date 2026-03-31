import {deleteRequest, getRequest, patchRequest, postRequest} from "@/services/axios.service";

async function getTeamsFromAPI(){

    return getRequest("/herocorp/teams/get","GET-TEAMS");
}
async function getTeams(){
    let response = null;

    try {
        // response = await loginUserFromLocalSource(data);
        response = await getTeamsFromAPI();
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de récupérer les teams'  }
    }
    return response
}



async function createTeamFromAPI(payload){

  return postRequest("/herocorp/teams/create",payload,"CREATE-TEAM");
}
async function createTeam(payload){
  let response = null;

  try {
    // response = await loginUserFromLocalSource(data);
    response = await createTeamFromAPI(payload);
  }
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de créé la team'  }
  }
  return response
}

async function addHeroesToTeamFromAPI(payload){

  return patchRequest("/herocorp/teams/addheroes",payload,"ADD-HEROES-TO-TEAM");
}
async function addHeroesToTeam(payload){
  let response = null;

  try {

    response = await addHeroesToTeamFromAPI(payload);
  }
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible d\'ajouter le héro' }
  }
  return response
}


async function removeHeroesFromTeamFromAPI(payload){
    console.log(payload)
    return patchRequest("/herocorp/teams/removeheroes",payload,"REMOVE-HEROES-TO-TEAM");
}
async function removeHeroesFromTeam(payload){
  let response = null;

  try {

    response = await removeHeroesFromTeamFromAPI(payload);
  }
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible du retrait le héro' }
  }
  return response
}


export default {
    getTeams,
  createTeam,
  addHeroesToTeam,
  removeHeroesFromTeam
}
