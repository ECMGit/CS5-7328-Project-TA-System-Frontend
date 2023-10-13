import axios from 'axios';
import { log } from 'console';

const TA_API_URL = process.env.REACT_APP_BACKEND_URL + '/user/jobs'; 

const getTAApplications = () => {
  return axios.get(TA_API_URL).then(res => {
    console.log(res);
  });
};

const getTAApplicationById = (id: string) => {
  return axios.put(TA_API_URL + `/${id}`).then( res => {
    console.log(res);
  });
};

// ... [Other potential TA-related API calls]

// Adding TA-related functions to your AuthService export
const AuthService = {          
  getTAApplications, 
  getTAApplicationById  
};

export default AuthService;
