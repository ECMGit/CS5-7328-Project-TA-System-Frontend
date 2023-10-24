
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from './constants';
const USER_API_URL: string | undefined = REACT_APP_BACKEND_URL+'/user/';

/**
 * This gets user table from the backend.
 * @returns
 */
const getAllUsersData = async()=> {
  return axios.get(USER_API_URL + 'getAll').then((response) => {
    return response.data;
  });
};
/**
 * Making the AuthService object available
 */
const userService = {
  getAllUsersData,
};

export default userService;