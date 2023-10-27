import React, { useState, useEffect } from 'react';
import { Typography, Container, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for navigation

interface User {
  username: string;
  // other user properties...
}

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
    setUser(currentUser);
  }, []);

  return (
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
        </Container>
      </div>
    </div>
  );
};

export default Home;
