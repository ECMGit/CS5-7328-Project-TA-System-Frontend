import axios, { AxiosResponse } from 'axios';

const ADMIN_API_URL = 'http://localhost:9000/user/admin';

/**
 * display student
 * @returns 
 */
const getStudent = async () => {
  try {
    const response = await axios.get(ADMIN_API_URL + '/students');
    return response.data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
};
/**
 * 
 * @returns display course
 */
const getCourse = async () => {
  try {
    const response = await axios.get(ADMIN_API_URL + '/course');
    return response.data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
};

/**
 * 
 * @returns display faculty
 */
const getFaculty = async () => {

  try {
    const response = await axios.get(ADMIN_API_URL + '/faculty');
    return response.data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }

};

const AdminService = {
  getStudent,
  getCourse,
  getFaculty,
};

export default AdminService;
