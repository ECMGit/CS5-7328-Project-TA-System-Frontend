import axios, { AxiosResponse } from 'axios';

const TA_API_URL = 'http://localhost:9000/jobs';

/**
 * Fetches all TA jobs.
 * @returns A promise that resolves to the Axios response containing TA jobs data.
 */
const getTAJobs = (): Promise<AxiosResponse> => {
  // Return the promise itself
  return axios.get(TA_API_URL).then((res) => {
    console.log(res);
    return res; // Here we return the response so the calling code gets it through the promise
  });
};

/**
 * Fetches a TA job by its ID.
 * @param id - The ID of the TA job to fetch.
 * @returns A promise that resolves to the Axios response containing TA job data.
 */
const getTAJobById = (id: number): Promise<AxiosResponse> => {
  // It seems odd to use 'put' for getting data, usually 'get' is used for retrieving data.
  // Ensure this is the intended method. If you're just retrieving data, 'get' might be more appropriate.
  return axios.get(`${TA_API_URL}/${id}`).then((res) => {
    console.log(res);
    return res; // Same here, we return the response
  });
};

/**
 * Fetches TA jobs with filters.
 * @param filters - An object containing filter criteria.
 * @returns A promise that resolves to the filtered TA jobs data.
 */
const fetchTAJobsWithFilters = async (filters: Record<string, any>): Promise<any> => {
  try {
    // Convert the 'filters' object into a query string.
    const queryString = new URLSearchParams(filters).toString();

    // Make a GET request with the query string.
    const response = await axios.get(`${TA_API_URL}/query?${queryString}`);
    return response.data; // TA jobs data.
  } catch (error) {
    console.error('Error fetching TA jobs with filters:', error);
    throw error;
  }
};

// Adding TA-related functions to your AuthService export
const AuthService = {
  getTAJobs,
  getTAJobById,
  fetchTAJobsWithFilters,
};

export default AuthService;
