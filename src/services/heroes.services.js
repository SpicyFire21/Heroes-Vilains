import {deleteRequest, getRequest, postRequest} from "@/services/axios.service";

async function getHeroesFromAPI(){

    return getRequest("/herocorp/heroes/getaliases","GET-HEROES");
}
async function getHeroes(){
    let response = null;

    try {
        // response = await loginUserFromLocalSource(data);
        response = await getHeroesFromAPI();
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de récupérer les heroes'  }
    }
    return response
}

async function createHeroFromAPI(data){

  return postRequest("/herocorp/heroes/create",data,"ADD-HERO");
}
async function createHero(data){
  let response = null;

  try {
    // response = await loginUserFromLocalSource(data);
    response = await createHeroFromAPI(data);
  }
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de la création du hero'  }
  }
  return response
}

export default {
    getHeroes,
  createHero
}
