import React, { useContext, useEffect, useState } from 'react';
import api from '../../services/taskform';
import { UserContext } from '../../provider';
import { Button } from '@mui/material';
import useAutoLogout from '../../components/AutoLogOut';
import { Link , useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import  Navbar from '../Navbar';
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
  const userContexts = useContext(UserContext);
  if (!userContexts) {
    return <div>Loading...</div>; // or any other fallback UI
  }

  const { user, setUser } = userContexts;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // React hooks
  const navigate = useNavigate();

  //console.log('home:', user);

  if (!user) {
    return <div>Loading...</div>; // or any other fallback UI
  }

  const { role } = user;

  const navigateToStudentProfile = () => {
    navigate('/student-profile');
  };

  const navigateToFacultyProfile = () => {
    navigate('/faculty-profile');
  };

  /**
   * Log out the user, delete user from localStorage
   */
  const handleLogout = function () {
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    navigate('/home-default');
  };

  const handlePerformance = () => {
    navigate('/performance-result', { state: { user } });
  };

  /**
   * Navigate to the corresponding user profile.
   */
  const handleProfile = function () {
    // Guard clause.
    if (!user) {
      return;
    }
    // Navigate to student/faculty profile.
    if (user.role === 'student') {
      navigate('/student-profile');
    } else if (user.role === 'faculty') {
      navigate('/faculty-profile');
    } else if (user.role === 'admin') {
      navigate('/admin-profile');
    }
  };

  const TIMEOUT_DURATION = 10 * 60 * 1000; // 10 minutes

  const logoutFunction = () => navigate('/login'); // Define your logout action

  // Use the auto-logout hook
  const { Modal, closeModal } = useAutoLogout({
    timeoutDuration: TIMEOUT_DURATION, // Use the defined timeout duration
    logoutFunction: () => {
      console.log('called');
      localStorage.clear(); 
      setUser(null); 
      setIsLoggedIn(false); 
      console.log('go to login');
      navigate('/login'); 
      
    },
  });

  // Use the 'useEffect' hook to execute code after the component renders.
  useEffect(() => {
    // Retrieve the 'user' data from local storage, parsing it from JSON, or default to 'null'.
    const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
    // Set the 'user' state with the retrieved user data.
    if (currentUser) {
      setUser(currentUser);
      setIsLoggedIn(true);
    }
  }, []);

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
    return (
      <div>
      <Navbar
        user={user} // Pass the user prop
        handleLogout={handleLogout} // Pass the handleLogout prop
        handleProfile={handleProfile} // Pass the handleProfile prop
        handlePerformance={handlePerformance} // Pass the handlePerformance prop
        isHomePage={false}
      /> <div>No Tasks Available</div>
      </div>
  ) ;
  }

  if (!Array.isArray(tasks)) {
    return <div>Error: Tasks data is not in the expected format</div>;
  }

  return (
    <div>
       <Navbar
        user={user} // Pass the user prop
        handleLogout={handleLogout} // Pass the handleLogout prop
        handleProfile={handleProfile} // Pass the handleProfile prop
        handlePerformance={handlePerformance} // Pass the handlePerformance prop
        isHomePage={false}
      />
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

      
    </div>
  );
};

export default ViewAssignedTasks;
