import {deleteRequest, getRequest, postRequest} from "@/services/axios.service";

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


export default {
    getTeams,
  createTeam
}
