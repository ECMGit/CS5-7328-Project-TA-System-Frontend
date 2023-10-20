import React, { useState, useEffect } from 'react';
import { Typography, Container } from '@mui/material';
import TAIndividualJobDisplay from './TAIndividualJobDisplay';

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
      <TAIndividualJobDisplay></TAIndividualJobDisplay>
    </Container>
  );
};

export default Home;
