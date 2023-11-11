// Import React and specific hooks (useState and useEffect) from the 'react' library.
import React, { useState, useEffect, useContext } from 'react';
// Import components (Typography and Container) from the Material-UI library.
import { Typography, Container, Button, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import TAJobDisplayComponent from './TAJobDisplayComponent';
import { LoadingButton } from '@mui/lab';
import { UserContext } from '../provider';

// Define an interface 'User' to specify the structure of a user object.
interface User {
  username: string;
}

// Define a functional component called 'Home' using the React.FC (Functional Component) type.
const Home: React.FC = () => {
  // Initialize a 'user' state variable using the 'useState' hook, initially set to 'null'.
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const role = user?.userType.role;
  
  const navigate = useNavigate();


  const navigateToStudentProfile = () => {
    navigate('/student-profile');
  };

  const navigateToFacultyProfile = () => {
    navigate('/faculty-profile');
  };

  return (
  // Render the component within a container with a maximum width of 'sm'.

    <div>
      {/* Blue banner with "Login" button */}
      <div style={{ backgroundColor: '#1976D2', padding: '16px', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h6' style={{ color: '#FFF' }}>
          SMU Lyle School of Engineering Job Site
        </Typography>
        {role === 'student' && (
          <Button onClick={navigateToStudentProfile} variant="contained" color="secondary">Student Profile</Button>
        )}
        {role === 'faculty' && (
          <Button onClick={navigateToFacultyProfile} variant="contained" color="secondary">Faculty Profile</Button>
        )}

        <Button component={Link} to="/login" variant="contained" color="secondary">
          Login
        </Button>
      </div>
      <div>
        {/* Large image at the top */}
        <img
          src="https://www.smu.edu/-/media/Site/DevelopmentExternalAffairs/MarketingCommunications/digital-marketing/students-hanging-dallas-hall.jpg?h=1333&iar=0&w=2000&hash=EAA3D7A0E96DA001440160E0ECB8643D"
          alt="SMU Dallas Hall"
          style={{ width: '100%', height: 'auto', }}
        />

        {/* Text box that spans the page, will fill it with about us and stuff BWG */}
        <Paper style={{ padding: '20px' }}>
          <Typography variant="body1">
            Welcome to CS5/7328 TA Job Site!
            This site is for SMU Lyle School of Engineering students to find TA jobs.
          </Typography>
        </Paper>
        {/* TODO: hide this Component when user not login */}

        {role === 'student' && (
          <Container maxWidth='sm' style={{ marginTop: '20px' }}>
            <TAJobDisplayComponent></TAJobDisplayComponent>
          </Container>
        )}
      </div>
    </div>
  );
};

// Export the 'Home' component so it can be used in other parts of the application.
export default Home;
