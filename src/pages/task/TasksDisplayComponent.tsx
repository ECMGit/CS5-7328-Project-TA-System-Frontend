import React, { useState, useEffect } from 'react';
import api from '../../services/taskform';

interface Task {
  id: number;
  name: string;
  description: string;
  // Define other properties of a task as needed
}

const ViewCurrentTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const storedUser = localStorage.getItem('user');
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.viewCurrent(storedUser);
        setTasks(response);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [storedUser]);

  return (
    <div>
      <h2>Current Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.name}</td>
              <td>{task.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCurrentTasks;