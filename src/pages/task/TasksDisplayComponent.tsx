import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/taskform';
import { UserContext } from '../../provider';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import { Link , useNavigate } from 'react-router-dom';
import useAutoLogout from '../../components/AutoLogOut';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Navbar from '../Navbar'; 
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
    return (
    <div>
     <div>
        <Navbar
          user={user}
          handleLogout={handleLogout}
          handleProfile={handleProfile}
          handlePerformance={handlePerformance}
          isHomePage={false}
        />
    </div>
       <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src="/Lyle_logo.png"
              alt="SMU Dallas Hall"
              style={{ width: '500px', height: '500px' }}
            />
            <div>
            <Typography variant="h3" align="center" style={{ marginTop: '20px' }}>
            You currently do not have tasks available! 
          </Typography>
            </div>  
        </div>
      </div>
    );
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
    <div>
       <Navbar
        user={user} // Pass the user prop
        handleLogout={handleLogout} // Pass the handleLogout prop
        handleProfile={handleProfile} // Pass the handleProfile prop
        handlePerformance={handlePerformance} // Pass the handlePerformance prop
        isHomePage={false}
      />
    </div>
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
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </Box>
    </div>
  );
};

export default ViewCurrentTasks;
