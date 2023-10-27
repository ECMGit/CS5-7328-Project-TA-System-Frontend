import React, { useState, useEffect } from 'react';
import { Typography, Container, Button } from '@mui/material';
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
          Home Page
        </Typography>
        {/* "Login" button */}
        <Button component={Link} to="/login" variant="contained" color="secondary">
          Login
        </Button>
      </div>
      <Container maxWidth='sm'>
        {user ? (
          <Typography variant='h1'>Welcome back, {user.username}!</Typography>
        ) : (
          <Typography variant='h1'>Please log in.</Typography>
        )}
      </Container>
    </div>
  );
};

export default Home;
