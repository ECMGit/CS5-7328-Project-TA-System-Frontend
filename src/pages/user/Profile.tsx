// Import React and specific Material-UI components and styles from '@mui/material'.
import React from 'react';
import { Container, Typography, Button, Avatar, Box, Input } from '@mui/material';

// Define a functional component called 'Profile' using the React.FC (Functional Component) type.
const Profile: React.FC = () => {
  return (
    // Render the component within a container with a maximum width of 'sm'.
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
        <Typography component="h1" variant="h5">
          User Profile
        </Typography>
        <Avatar sx={{ width: 56, height: 56, mt: 3 }} alt="User Profile" />
        <Box sx={{ mt: 2 }}>
          <Input type="file" id="profileUpload" sx={{ display: 'none' }} onChange={handleFileChange} />
          <Button variant="contained" color="primary" onClick={handleUploadClick}>
            Upload Profile
          </Button>
        </Box>
      </Box>
    </Container>
  );

  // Function to trigger the hidden file upload input element.
  function handleUploadClick() {
    document.getElementById('profileUpload')?.click();
  }

  // Function to handle file selection when a file is chosen in the input.
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      // Handle the file upload here
    }
  }
};

// Export the 'Profile' component so it can be used in other parts of the application.
export default Profile;