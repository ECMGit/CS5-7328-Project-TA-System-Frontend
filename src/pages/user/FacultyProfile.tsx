import React, { useState } from 'react';
import { Container, Typography, Button, Avatar, Box, Input, TextField, Paper, Grid } from '@mui/material';

const FacultyProfile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [resume, setResume] = useState<string | null>(null);

  // Function to open the file upload dialog when the "Upload Profile" button is clicked
  function handleUploadClick() {
    document.getElementById('profileUpload')?.click();
  }

  // Function to handle the change of the profile image file
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const uploadedImage = e.target?.result as string;
        setProfileImage(uploadedImage);
      };
      reader.readAsDataURL(file);
    }
  }

  // Function to handle the change of the resume file
  function handleResumeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const uploadedResume = e.target?.result as string;
        setResume(uploadedResume);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#1976D2', // Blue color
          color: '#FFF', // White color
          padding: '16px', // Adjust the padding as needed
        }}
      >
        My Faculty Dashboard
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography component="h1" variant="h5">
              Faculty Profile
            </Typography>
            <Avatar
              sx={{ width: 200, height: 200, mt: 3 }}
              alt="User Profile"
              src={profileImage || undefined}
            />
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button variant="contained" color="primary" sx={{ width: '100%'}} onClick={handleUploadClick}>
                    Upload Profile
                  </Button>
                  <Input type="file" id="profileUpload" sx={{ display: 'none' }} onChange={handleFileChange} />
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" color="primary" sx={{ width: '100%'}} onClick={() => document.getElementById('resumeUpload')?.click()}>
                    Upload Resume
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ mt: 4 }}>
              <form>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Department"
                  variant="outlined"
                  fullWidth
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Input type="file" id="resumeUpload" sx={{ display: 'none' }} onChange={handleResumeChange} />
                {resume && (
                  <a href={resume} target="_blank" rel="noopener noreferrer">
                    View Resume
                  </a>
                )}
              </form>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" color="primary" sx={{ width: '100%' }} onClick={handleSave}>
                  Save
                </Button>
              </Box>
            </Box>
            {name && department && (
              <Paper elevation={3} sx={{ padding: 2, mt: 2, maxWidth: '80%' }}>
                <Typography variant="h6">User Information</Typography>
                <Typography>Name: {name}</Typography>
                <Typography>Department: {department}</Typography>
              </Paper>
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          {/* Right section with Job Boxes using Box components */}
          {/* These boxes should be active applications or open positions that you've filled*/}
          <Box sx={{ mt: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* This <Box> component contains a set of job-related information */}
            <Paper elevation={3} sx={{ spacing: 2, padding: 2, mb: 2, width: '100%' }}>
              <Typography variant="h6">Class 1</Typography>
              <Typography>Description of Class 1</Typography>
              <Typography>Date Submitted: 2023-10-15</Typography>
              <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
      Check Applicants
              </Button>
              <Button variant="contained" color="secondary">
      Edit Posting
              </Button>
            </Paper>
            <Paper elevation={3} sx={{ spacing: 2, padding: 2, mb: 2, width: '100%' }}>
              <Typography variant="h6">Class 2</Typography>
              <Typography>Description of Class 2</Typography>
              <Typography>Date Submitted: 2023-10-16</Typography>
              <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
      Check Applicants
              </Button>
              <Button variant="contained" color="secondary">
      Edit Posting
              </Button>
            </Paper>
            <Paper elevation={3} sx={{ spacing: 2, padding: 2, width: '100%' }}>
              <Typography variant="h6">Class 3</Typography>
              <Typography>Description of Class 3</Typography>
              <Typography>Date Submitted: 2023-10-17</Typography>
              <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
      Check Applicants
              </Button>
              <Button variant="contained" color="secondary">
      Edit Posting
              </Button>
            </Paper>
          </Box>

        </Grid>
      </Grid>
    </Container>
  );

  function handleSave() {
    // Handle saving the user's information
  }
};

export default FacultyProfile;
