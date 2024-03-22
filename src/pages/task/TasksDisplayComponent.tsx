import React, { useState, useEffect } from 'react';
import api from '../../services/taskform';

interface Task {
  id: number;
  title: string;
  description: string;
  // Define other properties of a task as needed
}

const ViewCurrentTasks: React.FC = (): JSX.Element => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const storedUser = localStorage.getItem('user');
  
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (storedUser) {

          const userId= JSON.parse(storedUser!).id;
  
          // Now you can access the user data as an array
          // console.log(userArray);

          // for(let key in userObject){
          //   console.log(key, userObject[key]);

          // }

          // Object.entries(userObject).forEach(([key,value])=>{
          //   console.log(key, value);
          // })

          // const studentId = userObject.student.userId;
          // console.log("hello" + studentId);
          // console.log(storedUser);
          const responseObj = await api.viewCurrent(userId );
          console.log('Hello' + responseObj);

          const temp = JSON.stringify(responseObj);
          const response = JSON.parse(temp);

          setTasks(response);
          const taskId= JSON.parse(response!).id;
          const taskTitle= JSON.parse(response!).title;
          const taskDescription= JSON.parse(response!).description;

          setDescription(taskDescription);
          setTitle(taskTitle);
          setId(taskId);

          console.log('Hello task id:' + taskId);
          // console.log(response);
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
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Current Tasks</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#f9f9f9', border: '1px solid #ddd' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id} style={{ backgroundColor: 'white' }}>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{id}</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{title}</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCurrentTasks;
