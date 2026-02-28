import {deleteRequest, getRequest, postRequest} from "@/services/axios.service";

async function loginFromAPI(data){

  return postRequest("/authapi/auth/signin",data,"POST-LOGIN");
}
async function login(data){
  let response = null;

  try {
    // response = await loginUserFromLocalSource(data);
    response = await loginFromAPI(data);
  }
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de se connecter'  }
  }
  return response
}

export default {
  login
}
