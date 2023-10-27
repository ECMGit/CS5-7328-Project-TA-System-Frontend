import axios from 'axios';

const TA_API_URL = 'http://localhost:9000/jobs';

//TODO: add comments for each function, convert this file to typescript

const getTAJobs = () => {
  // Return the promise itself
  return axios.get(TA_API_URL).then((res) => {
    console.log(res);
    return res; // Here we return the response so the calling code gets it through the promise
  });
};

const getTAJobById = (id) => {
  // It seems odd to use 'put' for getting data, usually 'put' is used for updating.
  // Ensure this is the intended method. If you're just retrieving data, 'get' might be more appropriate.
  return axios.get(TA_API_URL + `/${id}`).then((res) => {
    console.log(res);
    return res; // Same here, we return the response
  });
};

/* 
  //Somewhere in your frontend code, e.g., in a React component:
  //This is what it would look like to call this function...

import { fetchTAJobsWithFilters } from './api'; // or wherever your API helpers are located
const MyComponent = () => {
  const handleFetchJobs = async () => {
    try {
      // Define your filters based on the requirements. 
      const filters = {
        title: 'Assistant', // You're looking for jobs with this title.
        courseId: 2,        // You're interested in jobs for this specific course.
        // ... any other filters
      };

  //  This is the backend setup right now, you can find it in user.service
  //  feel free to add to it
  //   type FilterParams = {
  //   title?: string;
  //   courseId?: number;
  //   course?: string;
  //   totalHoursPerWeek?: number;
  //   faculty?: string;
  // };

      const filteredJobs = await fetchTAJobsWithFilters(filters);

      // Now 'filteredJobs' will contain the TA jobs that match the criteria.
      // You can set this to state or do whatever is needed in your application.
      console.log(filteredJobs);
    } catch (error) {
      console.error("Failed to fetch jobs with filters", error);
      // Handle the error appropriately.
    }
  };

  // ...
};

*/

const fetchTAJobsWithFilters = async (filters) => {
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
