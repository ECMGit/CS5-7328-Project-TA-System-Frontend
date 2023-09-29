import React from 'react';
import { Container, Typography, Button, Avatar, Box, Input } from '@mui/material';

const Profile: React.FC = () => {
  return (
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

  function handleUploadClick() {
    document.getElementById('profileUpload')?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      // Handle the file upload here
    }
  }
};

export default Profile;