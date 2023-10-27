import React, { useState } from 'react';
import { Container, Typography, Button, Avatar, Box, Input, TextField, Paper, Grid } from '@mui/material';

const Profile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [graduationYear, setGraduationYear] = useState<string>('');
  const [major, setMajor] = useState<string>('');
  const [resume, setResume] = useState<string | null>(null);

  function handleUploadClick() {
    document.getElementById('profileUpload')?.click();
  }

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
        {/* Add an image that, when clicked, redirects to the first page */}
        <img
          src="logo192.png" // Provide the actual image source
          alt="Click to go back"
          style={{ cursor: 'pointer' }}
        />
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography component="h1" variant="h5">
              User Profile
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
                  label="Graduation Year"
                  variant="outlined"
                  fullWidth
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Major"
                  variant="outlined"
                  fullWidth
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
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
            {name && graduationYear && major && (
              <Paper elevation={3} sx={{ padding: 2, mt: 2, maxWidth: '80%' }}>
                <Typography variant="h6">User Information</Typography>
                <Typography>Name: {name}</Typography>
                <Typography>Graduation Year: {graduationYear}</Typography>
                <Typography>Major: {major}</Typography>
              </Paper>
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          {/* Right section with Job Boxes using Box components */}
          {/* These boxes should be active applications or open positions that you've filled*/}
          <Box sx={{ mt: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Paper elevation={3} sx={{ spacing: 2, padding: 2, mb: 2, width: '100%' }}>
              <Typography variant="h6">Job Title 1</Typography>
              <Typography>Description of Job 1</Typography>
              <Typography>Date Submitted: 2023-10-15</Typography>
            </Paper>
            <Paper elevation={3} sx={{ spacing: 2, padding: 2, mb: 2, width: '100%' }}>
              <Typography variant="h6">Job Title 2</Typography>
              <Typography>Description of Job 2</Typography>
              <Typography>Date Submitted: 2023-10-16</Typography>
            </Paper>
            <Paper elevation={3} sx={{ spacing: 2, padding: 2, width: '100%' }}>
              <Typography variant="h6">Job Title 3</Typography>
              <Typography>Description of Job 3</Typography>
              <Typography>Date Submitted: 2023-10-17</Typography>
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

export default Profile;
