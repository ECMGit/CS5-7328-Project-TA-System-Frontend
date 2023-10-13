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
      const reader = a FileReader();
      reader.onload = (e) => {
        const uploadedResume = e.target?.result as string;
        setResume(uploadedResume);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
        <Typography component="h1" variant="h5">
          User Profile
        </Typography>
        <Avatar
          sx={{ width: 100, height: 100, mt: 3 }}
          alt="User Profile"
          src={profileImage || undefined}
        />
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button variant="contained" color="primary" sx={{ width: '100%' }} onClick={handleUploadClick}>
                Upload Profile
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" color="primary" sx={{ width: '100%' }} onClick={() => document.getElementById('resumeUpload')?.click()}>
                Upload Resume (PDF)
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
            />
            <TextField
              label="Graduation Year"
              variant="outlined"
              fullWidth
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
            />
            <TextField
              label="Major"
              variant="outlined"
              fullWidth
              value={major}
              onChange={(e) => setMajor(e.target.value)}
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
    </Container>
  );

  function handleSave() {
    // Handle saving the user's information
  }
};

export default Profile;
