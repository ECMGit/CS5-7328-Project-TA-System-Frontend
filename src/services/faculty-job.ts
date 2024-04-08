import axios from 'axios';
import { backendURL } from '../config';
//Simplify the code by JobData interface
import { JobData } from "../components/jobData";


//const JOBS_API_URL = 'http://localhost:9000/faculty-jobs';
//Use one backedn URL 
const JOBS_API_URL = backendURL + '/jobs';
const token = localStorage.getItem('token');

const getJobs = () => {
  // henry: move localStorage import into this function
  // to avoid error when user login was not faculty the json
  // string was empty.
  const userString = localStorage.getItem('user') ?? '';
  const user = JSON.parse(userString);
  return axios.get(JOBS_API_URL, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(res => {
    console.log(res);
    return res.data;
  }).catch(err => {
    console.log(err);
  });
};

const getJobsByFacultyID = (facultyId: number) => {
  const JOBS_API_BY_FACULTY = backendURL + '/faculty/' + facultyId;
  return axios.get(JOBS_API_BY_FACULTY).then(res => {
    console.log(res);
    return res.data;
  }).catch(err => {
    console.log(err);
  });
};

//get one job from id passed as parameter
const getOneJob = (id: number) => {
  return axios.get(JOBS_API_URL + '/' + id, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(res => {
    console.log(res);
    return res.data;
  }).catch(err => {
    console.log(err);
  });
};

//update the postJob function
const postJob = async (job: JobData) => {
  try {
    const response = await axios.post(JOBS_API_URL, job);
    console.log(response);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const getFacultyJobs = (id: number) => {
  console.log(token);
  return axios.get(JOBS_API_URL + '/faculty/' + id, {
    headers: {
      'Authorization': `Bearer ${token}`
    }

  }).then(res => {
    console.log(res);
    return res.data;
  }).catch(err => {
    console.log(err);
  });
};
//update job from id passed as parameter
//update the updatJob function
const updateJob = async (id: number, job: JobData) => {
  try {
    const response = await axios.put(`${JOBS_API_URL}/edit/${id}`, job);
    console.log(response);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const FacultyJobService = {
  getJobsByFacultyID,
  getJobs,
  getOneJob,
  postJob,
  getFacultyJobs,
  updateJob
};

export default FacultyJobService;