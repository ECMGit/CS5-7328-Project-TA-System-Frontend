import React from 'react'; // page to check the status of individual applications 
import { Container, Paper, Typography, Button } from '@mui/material';

const CheckApplicationStatus = () => {
  // Function to simulate checking the application status
  const checkStatus = () => {
    alert("Application Status: Under Review");
    // In a real application, this might trigger a network request to retrieve the status
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ spacing: 2, padding: 2, mb: 2, width: '100%' }}>
        <Typography variant="h6">Job Title 1</Typography>
        <Typography>Description of Job 1</Typography>
        <Typography>Date Submitted: 2023-10-15</Typography>
        <Button variant="contained" color="primary" onClick={checkStatus}>
          Check Application Status
        </Button>
      </Paper>
    </Container>
  );
};

export default CheckApplicationStatus;
