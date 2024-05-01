import axios from 'axios';
import { AxiosResponse } from 'axios';

const BASE_API_URL = 'http://localhost:9000';

// Function to fetch all users
const fetchUsers = async () => {
    try {
        const response = await axios.get(`${BASE_API_URL}/admin/users`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

// Function to create a new user
const createUser = async (userData: object) => {
    return axios.post(`${BASE_API_URL}/admin/users`, userData, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        console.log(response.data);
    }).catch((error) => {
        console.error('Error creating user:', error);
    });
};

// Function to update a user
const updateUser = async (id: string, userData: object) => {
    return axios.put(`${BASE_API_URL}/admin/users/${id}`, userData, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        console.log(response.data);
    }).catch((error) => {
        console.error('Error updating user:', error);
    });
};

// Function to delete a user
const deleteUser = async (id: string) => {
    return axios.delete(`${BASE_API_URL}/admin/users/${id}`);
};

// Function to manage roles
const updateRoles = async (id: string, roles: string[]) => {
    return axios.put(`${BASE_API_URL}/admin/users/${id}/roles`, { roles }, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        console.log('Roles updated:', response.data);
    }).catch((error) => {
        console.error('Error updating roles:', error);
    });
};

const AdminService = {
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    updateRoles,
};

export default AdminService;
