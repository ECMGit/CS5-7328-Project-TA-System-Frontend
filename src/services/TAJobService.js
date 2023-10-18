import axios from 'axios';

const TA_API_URL = 'http://localhost:9000/jobs'; 

const getTAJobs = () => {
  // Return the promise itself
  return axios.get(TA_API_URL).then(res => {
    console.log(res);
    return res; // Here we return the response so the calling code gets it through the promise
  });
};

const getTAJobById = (id) => {
  // It seems odd to use 'put' for getting data, usually 'put' is used for updating. 
  // Ensure this is the intended method. If you're just retrieving data, 'get' might be more appropriate.
  return axios.get(TA_API_URL + `/${id}`).then(res => {
    console.log(res);
    return res; // Same here, we return the response
  });
};

// ... [Other potential TA-related API calls]

// Adding TA-related functions to your AuthService export
const AuthService = {          
  getTAJobs, 
  getTAJobById  
};

export default AuthService;
