import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/taskform';
import { UserContext } from '../../provider';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useAutoLogout from '../../components/AutoLogOut';

const { Modal, closeModal } = useAutoLogout();

interface Task {
  facultyId: number;
  studentId: number;
  title: string;
  description: string | null;
  TaskId: number;
  completed: boolean;
  courseId: number; 
  course: {
    courseCode: string;
    title: string;
  }
}

const ViewCurrentTasks: React.FC = () => {
  const userContext = useContext(UserContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const storedUser = localStorage.getItem('user');
  const [userId, setUserId] = useState(0); 

  const fetchTasks = async () => {
    try {
      if (storedUser) {
        const userId = JSON.parse(storedUser).smuNo;
        setUserId(userId);
        const responseObj = await api.viewCurrent(userId);
        setTasks(responseObj);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  useEffect(() => {
    

    fetchTasks();
  }, [storedUser]);

  if (!tasks.length) {
    return <div>No Tasks Available</div>;
  }
  
  if (!Array.isArray(tasks)) {
    return <div>Error: Tasks data is not in the expected format</div>;
  }

  // const handleTaskCompletion = async (userId: number , taskId: number) => {
  //   try {
  //     await api.checkoff(userId, taskId);
  //     // You can also update the state or perform any other logic here
  //   } catch (error) {
  //     console.error('Error completing task:', error);
  //   }
  // };

  return (
    <Box sx={{ flexGrow: 1, padding: '20px'}}>
      <Grid container spacing={2}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
        <Typography variant="h2" gutterBottom>
        Current Tasks
        </Typography>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Task ID</th>
                <th style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Title</th>
                <th style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.TaskId} style={{ backgroundColor: 'white' }}>
                  <td style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>{task.TaskId}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>{task.title}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>{task.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button component = {Link} to="/home" variant ="contained" color = "secondary">Home</Button>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      {Modal}
    </Box>
    
  );
};

export default ViewCurrentTasks;
