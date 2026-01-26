import {deleteRequest, getRequest, postRequest} from "@/services/axios.service";

async function getHeroesFromAPI(){

    return getRequest("/heroes/getaliases","GET-HEROES");
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

export default {
    getHeroes
}
