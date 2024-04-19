// Import React and specific hooks (useState and useEffect) from the 'react' library.
import React, { useState, useEffect, useContext } from 'react';
// Import components (Typography and Container) from the Material-UI library.
import { Typography, Container, Button, Paper, Avatar } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import Link for navigation
import AvatarWrapper from '../components/AvatarWrapper';
import { UserContext } from '../provider';

const TopNav: React.FC = () => {
  const location = useLocation();
  const isViewJobsPage = location.pathname === '/jobs';
  const isPostJobsPage = location.pathname === '/post-job';
  const isEditJobsPage = location.pathname === '/edit-job/:jobId';
  const isViewApplicationsPage = location.pathname === '/view-applications';

  // Initialize a 'user' state variable using the 'useState' hook, initially set to 'null'.
  const userContext = useContext(UserContext);
  if (!userContext) {
    return <div>Loading...</div>; // or any other fallback UI
  }

  const { user, setUser } = userContext;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // React hooks
  const navigate = useNavigate();

  //console.log('home:', user);

  if (!user) {
    return <div>Loading...</div>; // or any other fallback UI
  }

  const { role } = user;
  /**
   * Log out the user, delete user from localStorage
   */
  const handleLogout = function () {
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    navigate('/home-default');
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
    }
  };

  const handlePerformance = () => {
    navigate('/performance-result', { state: { user } });
  };

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

  return (
    <div>
      {/* Blue banner with "Login" button */}
      <div
        style={{
          backgroundColor: '#1976D2',
          padding: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {isViewJobsPage ? (
          <Typography variant="h6" style={{ color: '#FFF' }}>
            View All Jobs
          </Typography>
        ) : isViewApplicationsPage ? (
          <Typography variant="h6" style={{ color: '#FFF' }}>
            View All Applications
          </Typography>
        ) : (
          <Typography variant="h6" style={{ color: '#FFF' }}>
            SMU Lyle School of Engineering Job Site
          </Typography>
        )}

        {/* show student Profile if the user log in as student  */}
        {/* {role === 'student' && (
            <Button onClick={navigateToStudentProfile} variant="contained" color="secondary">Student Profile</Button>
            )} */}
        {/* show falcuty if the user log in as faculty */}
        {/* {role === 'faculty' && (
            <Button onClick={navigateToFacultyProfile} variant="contained" color="secondary">Faculty Profile</Button>
            )} */}

        {/* <Button component={Link} to="/view-applications" variant="contained" color="secondary">
            View Applications
            </Button> */}
        <div style={{ marginLeft: 'auto' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {user.role === 'admin' ? (
                <>
                  <Button
                    component={Link}
                    to="/view-courses"
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '5px', marginRight: '5px' }}
                  >
                    View Courses
                  </Button>
                  <Button
                    component={Link}
                    to="/jobs"
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '5px', marginRight: '5px' }}
                  >
                    View Jobs
                  </Button>
                  <Button
                    component={Link}
                    to="/post-job"
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '10px' }}
                  >
                    Post Job
                  </Button>
                  <Button
                    component={Link}
                    to="/view-applications"
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '5px', marginRight: '10px' }}
                  >
                    View Applications
                  </Button>

                  <Button
                    component={Link}
                    to="/create-task"
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '5px', marginRight: '10px' }}
                  >
                    Create Task
                  </Button>

                  <Button
                    component={Link}
                    to="/tasks/faculty"
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '5px', marginRight: '10px' }}
                  >
                    View Tasks
                  </Button>
                </>
              ) : user.role === 'student' ? (
                <>
                  <Button
                    component={Link}
                    to="/jobs"
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '5px', marginRight: '10px' }}
                  >
                    View Available Jobs
                  </Button>
                  <Button
                    component={Link}
                    to="/tasks/student"
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '5px', marginRight: '5px' }}
                  >
                    View Tasks
                  </Button>
                  {/* Add a view performance button in the home page, just for student */}
                  <Button
                    onClick={() => handlePerformance()}
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '5px', marginRight: '5px' }}
                  >
                    View My Performance
                  </Button>
                  <Button
                    component={Link}
                    to="/view-applications"  // Should be navigate to view my applications page (Student only)
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '5px', marginRight: '10px' }}
                  >
                    View My Applications
                  </Button>

                </>
              ) : user.role === 'faculty' ? (
                <>
                  <Button
                    component={Link}
                    to="/post-job"
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '10px', marginRight: '5px' }}
                  >
                    Post Job
                  </Button>
                  <Button
                    component={Link}
                    to="/jobs"
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '5px', marginRight: '5px' }}
                  >
                    View Jobs
                  </Button>
                  <Button
                    component={Link}
                    to="/view-applications"
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '5px', marginRight: '10px' }}
                  >
                    View Applications
                  </Button>
                </>
              ) : (
                ''
              )}
              <AvatarWrapper
                user={user}
                onLogout={handleLogout}
                onProfile={handleProfile}
              />
            </div>
          ) : (
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="secondary"
              style={{ marginRight: '10px' }}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNav;
