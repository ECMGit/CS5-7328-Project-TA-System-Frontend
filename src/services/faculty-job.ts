import axios from 'axios';

const JOBS_API_URL = 'http://localhost:9000/jobs/faculty';
const userString = localStorage.getItem('user') ?? '';
const user = JSON.parse(userString);
const getJobs = () => {
  return axios.get(JOBS_API_URL+'/'+user.id).then(res => {
    console.log(res);
    return res.data;
  }).catch(err => {
    console.log(err);
  });
};
//get one job from id passed as parameter
const getOneJob = (id: number) => {
  return axios.get(JOBS_API_URL + '/' + id).then(res => {
    console.log(res);
    return res.data;
  }).catch(err => {
    console.log(err);
  });
};
const postJob = (job: {
    title: string;
    courseId: number;
    courseSchedule: string;
    totalHoursPerWeek: number;
    maxNumberOfTAs: number;
    requiredCourses: string;
    requiredSkills: string;
    TAStats: string;
    notes?: string;
    deadlineToApply: Date;
    facultyId: number;
}) => {
  return axios.post(JOBS_API_URL, job).then(res => {
    console.log(res);
    return res.data;
  }).catch(err => {
    console.log(err);
    alert(err);
  });
};
//update job from id passed as parameter
const updateJob = (id: number, job: {
    title: string;
    courseId: number;
    courseSchedule: string;
    totalHoursPerWeek: number;
    maxNumberOfTAs: number;
    requiredCourses: string;
    requiredSkills: string;
    TAStats: string;
    notes?: string;
    deadlineToApply: Date;
    facultyId: number;
}) => {
  return axios.put(JOBS_API_URL + '/edit/' + id, job).then(res => {
    console.log(res);
    return res.data;
  }).catch(err => {
    console.log(err);
    alert(err);
  });
};

const FacultyJobService = {
  getJobs,
  getOneJob,
  postJob,
  updateJob
};

export default FacultyJobService;