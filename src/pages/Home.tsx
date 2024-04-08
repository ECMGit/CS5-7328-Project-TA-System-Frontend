// Import React and specific hooks (useState and useEffect) from the 'react' library.
import React, { useState, useEffect, useContext } from 'react';
// Import components (Typography and Container) from the Material-UI library.
import { Typography, Container, Button, Paper, Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import TAJobDisplayComponent from './TAJobDisplayComponent';
import { UserContext } from '../provider';
import AvatarWrapper from '../components/AvatarWrapper';
import AdminDashboard from './AdminDashboard';
import { link } from 'fs';

// Define an interface 'User' to specify the structure of a user object.
// interface User {
//   username: string;
//   avatarUrl: string;
//   role: string;
//   firstName: string;
//   smuNo: number;
// }

// Define a functional component called 'Home' using the React.FC (Functional Component) type.
const Home: React.FC = () => {
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
  const renderContent = () => {
    // When the user is an administrator, display the AdminDashboard component
    if (user && user.role === 'admin') {
      return <AdminDashboard />;
    } else {
      // Content displayed by non administrator users
      return (
        <>
          {/* Large image at the top */}
          <img
            src="https://www.smu.edu/-/media/Site/DevelopmentExternalAffairs/MarketingCommunications/digital-marketing/students-hanging-dallas-hall.jpg?h=1333&iar=0&w=2000&hash=EAA3D7A0E96DA001440160E0ECB8643D"
            alt="SMU Dallas Hall"
            style={{ width: '100%', height: 'auto' }}
          />
          {/* Text box that spans the page */}
          {user && (
            <Paper style={{ padding: '20px' }}>
              <Typography variant="body1">
                Welcome to CS5/7328 TA Job Site! This site is for SMU Lyle
                School of Engineering students to find TA jobs.
              </Typography>
            </Paper>
          )}

          {/* If the user is a student, display their work list */}
          {user && user.role === 'student' && (
            <Container maxWidth="sm" style={{ marginTop: '20px' }}>
              <TAJobDisplayComponent />
            </Container>
          )}
        </>
      );
    }
  };

  return (
    // Render the component within a container with a maximum width of 'sm'.

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
        <Typography variant="h6" style={{ color: '#FFF' }}>
          SMU Lyle School of Engineering Job Site
        </Typography>
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
                    See Jobs
                  </Button>
                  <Button
                    component={Link}
                    to="/post-job"
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '10px' }}
                  >
                    Publish
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
                    Display
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
                  {/* Add a view performance button in the hone page, just for student */}
                  <Button
                    component={Link}
                    to="/performance-result"
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '5px', marginRight: '5px' }}
                  >
                    View My Performance
                  </Button>
                  {/* <Button
                    component={Link}
                    to="/view-applications"
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '5px', marginRight: '10px' }}
                  >
                    View Applications
                  </Button> */}
                </>
              ) : user.role === 'faculty' ? (
                <>
                  <Button
                    component={Link}
                    to="/jobs"
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '5px', marginRight: '5px' }}
                  >
                    See Jobs
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

      <div>
        {/* Call renderContent to display corresponding content based on user roles */}
        {renderContent()}

        {/* Text box that spans the page, will fill it with about us and stuff BWG */}
        <Paper style={{ padding: '20px' }}>
          <Typography variant="body1">
            Welcome to CS5/7328 TA Job Site! This site is for SMU Lyle School of
            Engineering students to find TA jobs.
          </Typography>
        </Paper>
        {/* TODO: hide this Component when user not login */}

        {/* show the TAjob listing if the user is student */}
        {/* {role === 'student' && (
          <Container maxWidth='sm' style={{ marginTop: '20px' }}>
            <TAJobDisplayComponent></TAJobDisplayComponent>
          </Container>
        )} */}
      </div>
    </div>
  );
};

// Export the 'Home' component so it can be used in other parts of the application.
export default Home;
