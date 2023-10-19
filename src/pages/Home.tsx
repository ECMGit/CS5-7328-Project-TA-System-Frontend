import React, { useState, useEffect } from 'react';
import { Typography, Container } from '@mui/material';
import TAJobDisplayComponent from './TAJobDisplayComponent';

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
    <Container maxWidth='sm'>
      {user ? (
        <Typography variant='h1'>Welcome back, {user.username}!</Typography>
      ) : (
        <Typography variant='h1'>Please log in.</Typography>
      )}
      <TAJobDisplayComponent></TAJobDisplayComponent>
    </Container>
  );
};

export default Home;
