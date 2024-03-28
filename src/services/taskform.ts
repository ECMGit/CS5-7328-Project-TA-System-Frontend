import axios from 'axios';
const BASE_URL = 'http://localhost:9000';
const token = localStorage.getItem('token');


const createTask = (facultyId: number, studentId: number,  title: string, description: string ) => {
  const CREATE_TASK_API = `${BASE_URL}/tasks`;
  return axios.post(CREATE_TASK_API, { facultyId,studentId, title, description}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(res => {
    console.log(res);
    return res.data;
  }).catch(err => {
    console.log(err);
    alert(err);
  });
};

const viewCompleted = (facultyId: number) => {
  const VIEW_COMPLETED_API = `${BASE_URL}/tasks/completed/${facultyId}`;
  return axios.get(VIEW_COMPLETED_API, {
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

const viewPending = (facultyId: number) => {
  const VIEW_PENDING_API = `${BASE_URL}/tasks/pending/${facultyId}`;
  return axios.get(VIEW_PENDING_API, {
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

const checkoff = (studentId: number, taskId: number) => {
  const CHECKOFF_API = `${BASE_URL}/tasks/checkoff/${studentId}/${taskId}`;
  return axios.put(CHECKOFF_API, {}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(res => {
    console.log(res);
    return res.data;
  }).catch(err => {
    console.log(err);
    alert(err);
  });
};

const viewCurrent = (studentId: number) => {
  const VIEW_CURRENT_API = `${BASE_URL}/tasks/current/${studentId}`;
  return axios.get(VIEW_CURRENT_API, {
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

const completedTasks = (studentId: number) => {
  const COMPLETED_TASKS_API = `${BASE_URL}/tasks/completed/${studentId}`;
  return axios.get(COMPLETED_TASKS_API, {
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


const TaskService = {
  createTask,
  viewCompleted,
  viewPending,
  checkoff,
  viewCurrent,
  completedTasks
};

export default TaskService;




