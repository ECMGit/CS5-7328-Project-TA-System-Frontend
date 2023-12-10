import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Avatar,
  Box,
  Input,
  TextField,
  Paper,
  Grid,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail'; // Make sure MailIcon is imported
import { useNavigate } from 'react-router-dom';

const StudentProfile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [graduationYear, setGraduationYear] = useState<string>('');
  const [major, setMajor] = useState<string>('');
  const [resume, setResume] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | Element>(null);
  const open = Boolean(anchorEl);
  const [messages, setMessages] = useState([{ id: 1, content: 'Test Message' }]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateToInbox = () => {
    navigate('/inbox');
    handleClose();
  };

  const navigate = useNavigate();

  const handleUploadClick = () => {
    document.getElementById('profileUpload')?.click();
  };

// Method to handle image file change
const handleFileChange = (event: { target: { files: any[]; }; }) => {
  const file = event.target.files[0]; // Get the selected file from input
  // Handle image file upload logic here
  console.log('Selected image file:', file);
};

// Method to handle resume file change
const handleResumeChange = (event: { target: { files: any[]; }; }) => {
  const file = event.target.files[0]; // Get the selected file from input
  // Handle resume file upload logic here
  console.log('Selected resume file:', file);
};

  // Method to fetch messages (placeholder for the actual fetch logic)
const fetchMessages = () => {
  // TODO: Implement actual fetch logic here
  fetch('https://api.example.com/messages')
    .then(response => response.json())
    .then(data => {
      // Handle fetched messages
      console.log('Fetched messages:', data);
    })
    .catch(error => {
      // Handle errors
      console.error('Error fetching messages:', error);
    });
};


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

        My Student Dashboard
        <Tooltip title="Menu">
          <IconButton
            color="inherit"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={navigateToInbox}>
            <Tooltip title="Inbox">
              <IconButton
                color="inherit"
                onClick={() => {
                  // Fetch messages when the inbox is opened (future implementation)
                  fetchMessages();
                }}
              >
                <MailIcon />
              </IconButton>
            </Tooltip>
            {/* Add an inbox UI element */}
            <Menu
              id="inbox-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
            >
              {/* Map through messages and display them */}
              {messages.map(message => (
                <MenuItem key={message.id}>
                  {message.content}
                </MenuItem>
              ))}
            </Menu>
          </MenuItem>
        </Menu>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Student Profile
            </Typography>
            <Avatar
              sx={{ width: 200, height: 200, mt: 3 }}
              alt="User Profile"
              src={profileImage || undefined}
            />
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: '100%' }}
                    onClick={handleUploadClick}
                  >
                    Upload Profile
                  </Button>
                  <Input
                    type="file"
                    id="profileUpload"
                    sx={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: '100%' }}
                    onClick={() =>
                      document.getElementById('resumeUpload')?.click()
                    }
                  >
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
                <Input
                  type="file"
                  id="resumeUpload"
                  sx={{ display: 'none' }}
                  onChange={handleResumeChange}
                />
                {resume && (
                  <a href={resume} target="_blank" rel="noopener noreferrer">
                    View Resume
                  </a>
                )}
              </form>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ width: '100%' }}
                  onClick={handleSave}
                >
                  Save
                </Button>
              </Box>
            </Box>
            {/* This stuff should be sent to the database following successful submission. Upon login, this will
              be pulled from the database and displayed correctly. for now, it will just be displayed BWG*/}
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
          <Box
            sx={{
              mt: '50px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* This <Box> component contains a set of job-related information */}
            <Paper
              elevation={3}
              sx={{ spacing: 2, padding: 2, mb: 2, width: '100%' }}
            >
              <Typography variant="h6">Job Title 1</Typography>
              <Typography>Description of Job 1</Typography>
              <Typography>Date Submitted: 2023-10-15</Typography>
              <Button variant="contained" color="primary">
                Check Application Status
              </Button>
            </Paper>
            <Paper
              elevation={3}
              sx={{ spacing: 2, padding: 2, mb: 2, width: '100%' }}
            >
              <Typography variant="h6">Job Title 2</Typography>
              <Typography>Description of Job 2</Typography>
              <Typography>Date Submitted: 2023-10-16</Typography>
              <Button variant="contained" color="primary">
                Check Application Status
              </Button>
            </Paper>
            <Paper elevation={3} sx={{ spacing: 2, padding: 2, width: '100%' }}>
              <Typography variant="h6">Job Title 3</Typography>
              <Typography>Description of Job 3</Typography>
              <Typography>Date Submitted: 2023-10-17</Typography>
              <Button variant="contained" color="primary">
                Check Application Status
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



export default StudentProfile;
