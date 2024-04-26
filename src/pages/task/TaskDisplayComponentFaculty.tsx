import React, { useContext, useEffect, useState } from 'react';
import api from '../../services/taskform';
import { UserContext } from '../../provider';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
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
}

const ViewAssignedTasks: React.FC = () => {
  const userContext = useContext(UserContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const storedUser = localStorage.getItem('user');
  console.log(storedUser);
  const [userId ,setUserId] = useState(0);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (storedUser) {
          const userId = JSON.parse(storedUser).id;
          const responseObj = await api.viewPending(userId);
          setUserId(userId);
          setTasks(responseObj);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [storedUser]);

  if (!tasks.length) {
    return <div>No Tasks Available</div>;
  }

  if (!Array.isArray(tasks)) {
    return <div>Error: Tasks data is not in the expected format</div>;
  }

  return (
    <div>
      <h2>Tasks Assigned</h2> 
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>CourseID</th>
            <th style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Task ID</th>
            <th style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Title</th>
            <th style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.TaskId} style={{ backgroundColor: 'white' }}>
              {/* Add logic here for the button to call the checkOFF api call 
              I think this may have to be on the task Display for the student*/}
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>{task.courseId}</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>{task.TaskId}</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>{task.title}</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>{task.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <Button component = {Link} to="/home">Home</Button>
      {Modal}
      
    </div>
  );
};

export default ViewAssignedTasks;
