import React, { useState, useEffect } from 'react';
import FacultyJobService from '../../services/faculty-job';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getFacultyCoursesWithTAs } from '../../services/evaluate';
import { FacultyCourseTAInfo } from '../../services/evaluate';
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
import TopNav from '../../components/TopNav';
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

const FacultyProfile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [resume, setResume] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]); // Assuming jobs have properties like id, title, description, date, etc.

  const [currentTAs, setCurrentTAs] = useState<FacultyCourseTAInfo[]>([]);

  const storedUserInfo = localStorage.getItem('user');

  useEffect(() => {
    // localStorage to get the user information
    if (storedUserInfo) {
      const userInfo = JSON.parse(storedUserInfo);
      setName(`${userInfo.firstName} ${userInfo.lastName}`);
      setDepartment(userInfo.faculty.department);
    }
  }, []);

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
          const coursesTAs: FacultyCourseTAInfo[] =
            await getFacultyCoursesWithTAs(facultyId);
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

  //TODO: Remove test message
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

  /* Note - The inbox menu and the profile menu don't make sense being together. 
  A solution -> put view messages button in profile menu*/
  return (
    <>
      <TopNav />
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5" mt={3}>
                Faculty Profile
              </Typography>
              <Avatar
                sx={{ width: 200, height: 200, mt: 3, md: 3 }}
                alt="User Profile"
                src={profileImage || undefined}
              />
              {/* Display user info with name and department */}
              {name && department && (
                <>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    User Information
                  </Typography>
                  <Typography>Name: {name}</Typography>
                  <Typography>Department: {department}</Typography>
                </>
              )}
              {/* Handle the upload profile and upload resume buttons */}
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ width: '100%', height: '50px' }}
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
                      sx={{ width: '100%', height: '50px' }}
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
                  {/* <TextField
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
                  /> */}
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
                <Box
                  sx={{ mt: 2, display: 'column', justifyContent: 'center' }}
                >
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
            </Box>
          </Grid>
          <Grid item xs={8}>
            {/* Right section with Job Boxes using Box components */}
            {/* These boxes should be active applications or open positions that you've filled*/}
            <Box
              sx={{
                mt: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5" mb={2}>
                Your Job Postings
              </Typography>
              {jobs.map((job) => (
                <Paper
                  key={job.id}
                  elevation={3}
                  sx={{ spacing: 2, padding: 2, mb: 2, width: '100%' }}
                >
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography>Note: {job.notes}</Typography>
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
                    Edit Job
                  </Button>
                </Paper>
              ))}
            </Box>
            {/* Box for current TA and evaluate performance */}
            <Box
              sx={{
                mt: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5" mb={2}>
                Current TA
              </Typography>
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
    </>
  );

  function handleSave() {
    // Handle saving the user's information
  }

  function handleCheckApplicants(jobId: number) {
    // Handle checking applicants for the specified job ID
    //TODO: Implement this function and pull data from backend -- team3 sprint3

    console.log(`Checking applicants for job ${jobId}`);
    navigate(`/view-application/:${jobId}`);
  }

  function handleEditPosting(jobId: number) {
    // Handle editing the posting for the specified job ID
    // TODO: Implement this function and pull data from backend -- team3 sprint3

    console.log(`Editing posting for job ${jobId}`);
    navigate(`/edit-job/${jobId}`);
  }
};

export default FacultyProfile;
