// Import React and specific hooks (useState and useEffect) from the 'react' library.
import React, { useState, useEffect } from 'react';
// Import components (Typography and Container) from the Material-UI library.
import { Typography, Container } from '@mui/material';
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

// Export the 'Home' component so it can be used in other parts of the application.
export default Home;
