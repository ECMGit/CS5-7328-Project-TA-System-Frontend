import axios from 'axios';
import { backendURL } from '../config';

const BASE_API_URL: string | undefined = backendURL + '/api/';
const USER_API_URL: string | undefined = backendURL + '/user/';
const PROFILE_API_URL: string | undefined = backendURL + '/profile/';
// const USER_API_URL = "https://9429d5b9-a4ce-43d8-bf6b-637cc223febe.mock.pstmn.io/";

/**
 * For Handling User Signup request
 * @param firstName
 * @param lastName
 * @param email
 * @param username
 * @param smuNo
 * @param password
 * @returns
 */

const signUp = (
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  smuNo: string,
  password: string,
  year: string,
  userType: string
) => {
  console.log(USER_API_URL + 'signUp');
  return axios.post(USER_API_URL + 'signUp', {
    firstName,
    lastName,
    email,
    username,
    smuNo,
    password,
    userType,
    year,
  });
};

/**
 * For Handling User Login request
 * @param username
 * @param password
 * @returns
 */
const login = (username: string, password: string) => {
  console.log(USER_API_URL + 'login');
  return axios
    .post(USER_API_URL + 'login', {
      username,
      password,
    })
    .then((response) => {
      // alert(JSON.stringify(response.data)); // for debugging purposes
      if (response.data.user) {
        // console.log(response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        // jsonwebtoken saved to storage for auth at login :)
        localStorage.setItem('token', response.data.token);
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

const getUserRoleFromBackEnd = (userId: number) => {
  // Pass the userId as a query parameter
  return axios.get(`${USER_API_URL}role/${userId}`)
    .then((response) => {
      return response.data.role;
    })
    .catch((error) => {
      console.error('Error fetching user role:', error);
      throw error; // You can handle or propagate the error as needed
    });
};

/**
 * For Handling User Role identification from local storage or backend
 * @param userId
 * @returns
 * */
const getUserRole = async (userId: number) => {
  const user = localStorage.getItem('user');
  if (user) {
    const userObject = JSON.parse(user);
    return userObject.role;
    // Use myObject as needed
  }else{
    return getUserRoleFromBackEnd(userId);
  }
};
/**
 * For Handling User Reset Password request
 * @param email
 * @returns
 */
const resetPasswordRequest = (email: string) => {
  return axios
    .post(USER_API_URL + 'password-reset-link', {
      email,
    })
    .then((response) => {
      // Handle success - maybe show a success message to the user
      console.log(response.data);
    })
    .catch((error) => {
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
    const response = await axios.post(USER_API_URL + 'password-reset/confirm', { token, password });
    return response.data.message;
  } catch (error) {
    console.error(error);
    throw new Error('Error resetting password. Please try again later.');
  }
};

// Fetch data from API regarding the TA Application.
const getTaApplication = async () => {
  try {
    const response = await axios.get('http://localhost:9000/ta-application');
    return response.data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
};

// Fetch data from API regarding the TAJob.
const getTaJob = async () => {
  try {
    const response = await axios.get('http://localhost:9000/jobs');
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

// For Handling saveProfile feature
const saveProfile = async (
  name: string,
  profileImage: string,
  graduationYear: string,
  major: string,
  resumeFile: string
) => {
  try {
    return axios.post(PROFILE_API_URL + 'save', {
      name,
      profileImage,
      graduationYear,
      major,
      resumeFile,
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error saving profile. Please try again');
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
/**
 * This represents some generic auth provider API, like Firebase.
 */
const getUserById = (id: number) => {
  // It seems odd to use 'put' for getting data, usually 'put' is used for updating.
  // Ensure this is the intended method. If you're just retrieving data, 'get' might be more appropriate.
  return axios.get(USER_API_URL + `${id}`).then((res) => {
    console.log(res);
    return res; // Same here, we return the response
  });
};

/**
 * For get user info from backend
 * @returns response with user data
 */
const getUserData = () => {
  return axios.get(USER_API_URL + '/').then((res) => {
    console.log(res);
    return res; // Same here, we return the response
  });
};

// Function use for getting the userId for current user.
export const getCurrentUserId = () => {
  const user = localStorage.getItem('user');
  if (user) {
    const userObject = JSON.parse(user);
    return userObject.id;
  }
  return null; 
};

const AuthService = {
  signUp,
  login,
  logout,
  getUserRole,
  getCurrentUser,
  resetPassword,
  resetPasswordRequest,
  getUserById,
  fakeAuthProvider,
  saveProfile,
  getTaApplication,
  getTaJob,
  getUser,
  getUserData,
};

export default AuthService;
