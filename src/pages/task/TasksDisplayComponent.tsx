import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/taskform';
import { UserContext } from '../../provider';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

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
    <div>
      <h2>Current Tasks</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Task ID</th>
            <th style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Title</th>
            <th style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Description</th>
            <th style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Course ID</th>
            <th style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Course Title</th>
            <th style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Status</th>
            <th style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Actions</th>

          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.TaskId} style={{ backgroundColor: 'white' }}>
              {/* ?'completed':'incomplete' */}
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>{task.TaskId}</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>{task.title}</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>{task.description}</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>{task.course.courseCode}</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>{task.course.title}</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>{task.completed?'completed':'incomplete'}</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>
                <button onClick={() => {api.checkoff(userId, task.TaskId);
                  fetchTasks();
                }}>Completed</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button component={Link} to="/home" variant="contained" color="secondary">Home</Button>
    </div>
  );
};

export default ViewCurrentTasks;
