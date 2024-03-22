import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/taskform';
import { UserContext } from '../../provider';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

interface Task {
  facultyId: number;
  studentId: number;
  title: string;
  description: string | null;
  TaskId: number;
  completed: boolean;
}

const ViewCurrentTasks: React.FC = (): JSX.Element => {
  const userContext = useContext(UserContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const storedUser = localStorage.getItem('user');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (storedUser) {
          const userId = JSON.parse(storedUser).id;
          const responseObj = await api.viewCurrent(userId);
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
      {userContext?.user?.role === 'student' && (
        <StudentTasks tasks={tasks} />
      )}
      {userContext?.user?.role === 'faculty' && (
        <FacultyTasks tasks={tasks} />
      )}
    </div>
  );
};

const StudentTasks: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  return (
    <div>
      <h2>Current Tasks</h2>
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

    </div>
  );
};

//not used remove later
const FacultyTasks: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  return (
    <div>
      <h2>Current Professor Tasks</h2>
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
    </div>
  );



};

export default ViewCurrentTasks;
