import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import useAutoLogout from '../../components/AutoLogOut';

const PostJobSuccessPage = () => {
  const { Modal } = useAutoLogout();
  const navigate = useNavigate();

  const handleBackToJobs = () => {
    navigate('/jobs'); // This should navigate back to the jobs listing or dashboard
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Job Posting Successful!
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Your job listing has been successfully posted.
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 4 }}
          onClick={handleBackToJobs}
        >
          Back to Job Listings
        </Button>
      </Box>
      {Modal}
    </Container>
  );
};

export default PostJobSuccessPage;
