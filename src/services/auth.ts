import axios from 'axios';

const BASE_API_URL: string | undefined = process.env.REACT_APP_BACKEND_URL+'/api/';
const USER_API_URL: string | undefined = process.env.REACT_APP_BACKEND_URL+'/user/';
// const USER_API_URL = "https://9429d5b9-a4ce-43d8-bf6b-637cc223febe.mock.pstmn.io/";

/**
 * For Handling User Signup request
 * @param firstName 
 * @param lastName 
 * @param email 
 * @param password 
 * @returns 
 */
const signUp = (firstName: string, lastName: string, email: string, password: string) => {
  return axios.post(USER_API_URL + 'signup', {
    firstName,
    lastName,
    email,
    password,
  });
};

/**
 * For Handling User Login request
 * @param username
 * @param password 
 * @returns 
 */
const login = (username: string, password: string) => {
  return axios
    .post(USER_API_URL + 'login', {
      username,
      password,
    })
    .then((response) => {
      // alert(JSON.stringify(response.data)); // for debugging purposes
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return response.data;
    });
};

/**
 * For Handling User Logout request
 * @returns 
 */
const logout = () => {
  localStorage.removeItem('user');
  return axios.post(USER_API_URL + 'logout').then((response) => {
    return response.data;
  });
};

/**
 * TODO: Remove this function
 * Degubbing purposes
 * @returns
 * */
const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

/**
 * For Handling User Reset Password request
 * @param email 
 * @returns 
 */

const resetPasswordRequest = (email: string) => {
  return axios.post(BASE_API_URL + 'password-reset-link', {
    email,
  }).then(response => {
    // Handle success - maybe show a success message to the user
    console.log(response.data);
  }).catch(error => {
    // Handle error - show an error message to the user
    console.error('Error sending reset email:', error);
  });
};

/**
 * For Handling User Reset Password request
 * @param token 
 * @param password 
 * @returns 
 */
const resetPassword = async (token: string, password: string) => {
  try {
    const response = await axios.post(BASE_API_URL+'password-reset/confirm', { token, password });
    return response.data.message;
  } catch (error) {
    console.error(error);
    throw new Error('Error resetting password. Please try again later.');
  }
};

// Fetch data from API regarding the TA Application. 
const getTaApplication = async () => {
  try {
    const response = await axios.get('http://localhost:9000/taApplication');
    return response.data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error; 
  }
};

// Fetch data from API regarding the TAJob. 
const getTaJob = async () => {
  try {
    const response = await axios.get('http://localhost:9000/taJob');
    return response.data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error; 
  }
};

// Fetch data from API regarding the user. 
const getUser = async () => {
  try {
    const response = await axios.get('http://localhost:9000/user');
    return response.data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error; 
  }
};

/**
 * This represents some generic auth provider API, like Firebase.
 */
const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signout(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};


const AuthService = {
  signUp,
  login,
  logout,
  getCurrentUser,
  resetPassword,
  resetPasswordRequest,
  fakeAuthProvider,
  getTaApplication,
  getTaJob, 
  getUser
};
  
export default AuthService;