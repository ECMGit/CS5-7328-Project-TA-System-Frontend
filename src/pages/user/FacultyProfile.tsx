import React, { useState, useEffect } from 'react';
import FacultyJobService from '../../services/faculty-job';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getFacultyCoursesWithTAs } from '../../services/evaluate';
import { getCurrentUserId } from '../../services/auth';
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
import MailIcon from '@mui/icons-material/Mail';
interface Job {
  id: number;
  title: string;
  courseId: number;
  courseSchedule: string;
  totalHoursPerWeek: number;
  maxNumberOfTAs: number;
  requiredCourses: string;
  requiredSkills: string;
  TAStats: string;
  notes: string;
  deadlineToApply: string;
  facultyId: number;
}



export interface FacultyCourseTAInfo {
  courseId: number;
  courseCode: string;
  title: string;
  username: string; // TA's name
  smuNo: number; // TA's SMU ID
}


const FacultyProfile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [resume, setResume] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]); // Assuming jobs have properties like id, title, description, date, etc.

  const [currentTAs, setCurrentTAs] = useState<FacultyCourseTAInfo[]>([]);

  useEffect(() => {
    FacultyJobService.getJobs()
      .then((data) => {
        console.log('Jobs data:', data);
        setJobs(data.slice(0, 3));
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
      });
  }, []);

  useEffect(() => {
    const fetchCurrentTAs = async () => {
      try {
        const facultyId = getCurrentUserId();
        if (facultyId) {
          const coursesTAs: FacultyCourseTAInfo[] = await getFacultyCoursesWithTAs(facultyId);
          setCurrentTAs(coursesTAs);
        }
      } catch (error) {
        console.error('Error fetching TAs:', error);
      }
    };
    fetchCurrentTAs();
  }, []);



  const [anchorEl, setAnchorEl] = useState<null | Element>(null);

  const open = Boolean(anchorEl);

  const [messages, setMessages] = useState([
    { id: 1, content: 'Test Message' },
  ]);

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

  const navigate = useNavigate();


  const handleEvaluateTA = (taInfo: FacultyCourseTAInfo) => {
    navigate('/evaluate-performance', { state: { taInfo } });
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchMessages = () => {
    // TODO: Implement fetch logic here
  };

  const navigateToInbox = () => {
    navigate('/inbox');
    handleClose();
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
        My Faculty Dashboard
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
            {/* <ListItemIcon>
              <MailIcon fontSize="small" />
            </ListItemIcon>
            Inbox */}
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
              {messages.map((message) => (
                <MenuItem key={message.id}>{message.content}</MenuItem>
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
                  label="Department"
                  variant="outlined"
                  fullWidth
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
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
              <Box sx={{ mt: 2, display: 'column', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ width: '100%' }}
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button
                  component={Link}
                  to="/jobs"
                  variant="contained"
                  color="primary"
                  style={{
                    marginTop: '8px',
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  View All Jobs
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
          <Box
            sx={{
              mt: '50px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {jobs.map((job) => (
              <Paper
                key={job.id}
                elevation={3}
                sx={{ spacing: 2, padding: 2, mb: 2, width: '100%' }}
              >
                <Typography variant="h6">{job.title}</Typography>
                <Typography>{job.notes}</Typography>
                <Typography>Date Submitted: {job.deadlineToApply}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: '10px' }}
                  onClick={() => handleCheckApplicants(job.id)}
                >
                  Check Applicants
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleEditPosting(job.id)}
                >
                  Edit Posting
                </Button>
              </Paper>
            ))}
          </Box>
          {/* Box for current TA and evaluate performance */}
          <Box
            sx={{
              mt: '50px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {currentTAs.map((ta) => (
              <Paper
                key={ta.courseId}
                elevation={3}
                sx={{ spacing: 2, padding: 2, mb: 2, width: '100%' }}
              >
                <Typography variant="h6">TA Name: {ta.username}</Typography>
                <Typography>SMU ID: {ta.smuNo}</Typography>
                <Typography>Course ID: {ta.courseId}</Typography>
                <Typography>course Code: {ta.courseCode}</Typography>
                <Typography>Course Name: {ta.title}</Typography>
                {/* TA performance evaluation button */}
                <Button
                  onClick={() => handleEvaluateTA(ta)}
                  component={Link}
                  to="/evaluate-performance"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, alignSelf: 'center' }}
                >
                  Evaluate TA
                </Button>
              </Paper>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );

  function handleSave() {
    // Handle saving the user's information
  }

  function handleCheckApplicants(jobId: number) {
    // Handle checking applicants for the specified job ID
    console.log(`Checking applicants for job ${jobId}`);
  }

  function handleEditPosting(jobId: number) {
    // Handle editing the posting for the specified job ID
    console.log(`Editing posting for job ${jobId}`);
  }
};

export default FacultyProfile;
