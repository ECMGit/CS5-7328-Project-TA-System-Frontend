import React, { useState, useEffect } from 'react';
import api from '../../services/taskform';
import { formToJSON } from 'axios';

interface Task {
  facultyId: number;
  studentId: number;
  title: string;
  description: string | null; // Assuming description can be null
  TaskId: number; // Assuming the property name for task ID is 'TaskId'
  completed: boolean;
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
          console.log('hello userId:' +userId);
          console.log(storedUser);
  
          // Now you can access the user data as an array
          // console.log(userArray);

         
          // Object.entries(userObject).forEach(([key,value])=>{
          //   console.log(key, value);
          // })

          // const studentId = userObject.student.userId;
          // console.log("hello" + studentId);
          // console.log(storedUser);
          const responseObj = await api.viewCurrent(userId );
          setTasks(responseObj);
          // for(const key in responseObj){
          //   console.log(key, responseObj[key]);

          // }
          

          // const temp = JSON.stringify(responseObj);
          // console.log(temp);
          // // const response = temp;
          // // const response = JSON.parse(temp);
          // const tempParse =JSON.parse(temp);
          // const firstObj = tempParse[0];

          // //arguments that can be accessed, title, TaskId, facultId, studentId

          // setTasks(tempParse);
          // const taskId= userId;
          // console.log('this is task id: ' + taskId);
          // const taskTitle= firstObj.title;
          // console.log('this is taskTitle: ' + taskTitle);

          // const taskDescription= firstObj.description;

          // setDescription(taskDescription);
          // setTitle(taskTitle);
          // setId(taskId);

          // console.log('Hello task id:' + taskId);
          // // console.log(response);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [storedUser]);

  console.log('Tasks:', tasks);

  if (!tasks.length) {
    return <div>No Tasks Available</div>;
  }
  
  if (!Array.isArray(tasks)) {
    return <div>Error: Tasks data is not in the expected format</div>;
  }

  return (
    <div>
      <h2>Current Tasks</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>ID</th>
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
