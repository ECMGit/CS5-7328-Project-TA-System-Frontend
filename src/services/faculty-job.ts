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
const postJob = (job: JobData) => {
  return axios.post(JOBS_API_URL, job).then(res => {
    console.log(res);
    return res.data;
  }).catch(err => {
    console.log(err);
    alert(err);
  });
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
const updateJob = (id: number, job: JobData) => {
  return axios.put(JOBS_API_URL + '/edit/' + id, job).then(res => {
    console.log(res);
    return res.data;
  }).catch(err => {
    console.log(err);
    alert(err);
  });
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