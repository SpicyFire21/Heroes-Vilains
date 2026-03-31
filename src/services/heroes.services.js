import {deleteRequest, getRequest, postRequest, putRequest} from "@/services/axios.service";

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

async function getProfileByLoginFromAPI(login){

  return getRequest(`/authapi/user/getuser/${login}`,"GET-PROFILE");
}
async function getProfileByLogin(login){
  let response = null;

  try {
    response = await getProfileByLoginFromAPI(login);
  }
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de réucpérer le profil du hero'  }
  }
  return response
}

async function updateHeroFromAPI(data){

  return putRequest(`/herocorp/heroes/authupdate`,data,"UPDATE-HERO");
}
async function updateHero(data){
  let response = null;

  try {
    response = await updateHeroFromAPI(data);
  }
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de modifier du hero'  }
  }
  return response
}

async function editHeroFromAPI(data){
  console.log(data)
  return putRequest(`/herocorp/heroes/update`,data,"EDIT-HERO");
}
async function editHero(data){
  let response = null;

  try {
    response = await editHeroFromAPI(data);
  }
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de modifier le hero'  }
  }
  return response
}


export default {
    getHeroes,
  createHero,
  getProfileByLogin,
  updateHero,
  editHero
}
