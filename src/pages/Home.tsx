// Import React and specific hooks (useState and useEffect) from the 'react' library.
import React, { useState, useEffect } from 'react';
// Import components (Typography and Container) from the Material-UI library.
import { Typography, Container, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for navigation
import TAJobDisplayComponent from './TAJobDisplayComponent';

// Define an interface 'User' to specify the structure of a user object.
interface User {
  username: string;
}

// Define a functional component called 'Home' using the React.FC (Functional Component) type.
const Home: React.FC = () => {
  // Initialize a 'user' state variable using the 'useState' hook, initially set to 'null'.
  const [user, setUser] = useState<User | null>(null);

  // Use the 'useEffect' hook to execute code after the component renders.
  useEffect(() => {
    // Retrieve the 'user' data from local storage, parsing it from JSON, or default to 'null'.
    const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
    // Set the 'user' state with the retrieved user data.
    setUser(currentUser);
  }, []);

  return (
    // Render the component within a container with a maximum width of 'sm'.
    <div>
      {/* Blue banner with "Login" button */}
      <div style={{ backgroundColor: '#1976D2', padding: '16px', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h6' style={{ color: '#FFF' }}>
          SMU Lyle School of Engineering Job Site
        </Typography>
        {/* "Login" button */}
        <Button component={Link} to="/login" variant="contained" color="secondary">
          Login
        </Button>
      </div>
      <div>
        {/* Large image at the top */}
        <img
          src="https://www.smu.edu/-/media/Site/DevelopmentExternalAffairs/MarketingCommunications/digital-marketing/students-hanging-dallas-hall.jpg?h=1333&iar=0&w=2000&hash=EAA3D7A0E96DA001440160E0ECB8643D"
          alt="SMU Dallas Hall"
          style={{ width: '100%', height: 'auto',}}
        />
      
        {/* Text box that spans the page, will fill it with about us and stuff BWG */}
        <Paper style={{ padding: '20px'}}>
          <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis eleifend est, eget bibendum lectus. Aenean non ullamcorper nisi.
          Phasellus vel lectus sit amet metus semper congue. Quisque ut odio quis metus bibendum euismod in sed nulla.
          </Typography>
        </Paper>

        <Container maxWidth='sm' style={{ marginTop: '20px' }}>
          {user ? (
            <Typography variant='h1'>Welcome back, {user.username}!</Typography>
          ) : (
            <Typography variant='h1'>Please log in.</Typography>
          )}
          <TAJobDisplayComponent></TAJobDisplayComponent>
    </Container>
      </div>
    </div>
  );
};

// Export the 'Home' component so it can be used in other parts of the application.
export default Home;
