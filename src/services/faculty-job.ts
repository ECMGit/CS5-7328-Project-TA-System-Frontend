import axios from 'axios';

const JOBS_API_URL = 'http://localhost:9000/faculty-jobs';
const token = localStorage.getItem('token');

const getJobs = () => {
  return axios.get(JOBS_API_URL).then(res => {
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

const FacultyJobService = {
  getJobs,
  postJob
};

export default FacultyJobService;