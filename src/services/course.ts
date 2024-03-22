import axios, { AxiosError, AxiosResponse } from 'axios';
import { courseData } from '../pages/courses/courseData';


const BASE_API_URL: string | undefined = process.env.REACT_APP_BACKEND_URL;
const COURSE_API_URL = BASE_API_URL ? `${BASE_API_URL}/course` : 'http://localhost:9000/course';

const axiosInstance = axios.create({
    baseURL: COURSE_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error: AxiosError) => {
    return Promise.reject(error);
});

type CourseDataForCreation = Omit<courseData, 'id'>;

export const addCourse = (courseData: CourseDataForCreation): Promise<courseData> => {
    return axiosInstance.post<courseData>('/add', courseData)
        .then((response: AxiosResponse<courseData>) => response.data)
        .catch((error: AxiosError) => {
            console.error('Error adding course:', error);
            throw error; // Rethrow the error for handling in the component
        });
};

export const editCourse = async (id: string, courseData: CourseDataForCreation): Promise<courseData> => {
    try {
        const response = await axiosInstance.put<courseData>(`/edit/${id}`, courseData);
        console.log('Course updated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating course:', error);
        throw error;
    }
};


export const getOneCourse = async (id: string): Promise<courseData> => {
    try {
        const response = await axiosInstance.get<courseData>(`/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching course data:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

export const getAllCourses = async (): Promise<courseData[]> => {
    try {
        const response = await axiosInstance.get<courseData[]>('/');
        console.log('Fetched all courses successfully:', response.data);
        return response.data; // This usually will be an array of course objects
    } catch (error) {
        console.error('Error fetching all courses data:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

const CourseService = {
    addCourse,
    editCourse,
    getOneCourse,
    getAllCourses,
};

export default CourseService;
