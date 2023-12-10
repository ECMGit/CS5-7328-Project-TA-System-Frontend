import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Link, useNavigate } from 'react-router-dom';
import ApplyService from '../../services/apply';
import TAJobService from '../../services/tajob';

interface Course {
  id: number;
  courseCode: string;
  title: string;
  description: string | null;
}

interface Application {
  id: string;
  taJobId: string;
  status: string;
}

interface Job {
  id: string;
  title: string;
  course: Course;
}

const StudentProfile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [graduationYear, setGraduationYear] = useState<string>('');
  const [major, setMajor] = useState<string>('');
  const [resume, setResume] = useState<string | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedApplicationStatus, setSelectedApplicationStatus] =
    useState<string>('');
  const [selectedApplicationId, setSelectedApplicationId] = useState<
    string | null
  >(null);
  const [showFullList, setShowFullList] = useState<boolean>(false);

  // CSS style for hiding items
  const hiddenStyle = {
    maxHeight: '0',
    overflow: 'hidden',
    transition: 'max-height 0.5s ease-out',
  };
  const visibleStyle = {
    maxHeight: '1000px',
    transition: 'max-height 0.5s ease-in',
  };

  useEffect(() => {
    // Fetch logged in student data from local storage.
    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;
    const studentId = user ? user.id : null;

    /**
     * Wrapper function to fetch applications by student ID.
     */
    const fetchAndSetApplications = async () => {
      if (studentId) {
        try {
          const tempApplications =
            await ApplyService.getTaApplicationsByStudentId(studentId);
          setApplications(tempApplications);
        } catch (error) {
          console.error('Error fetching applications:', error);
        }
      }
    };

    fetchAndSetApplications();
  }, []);

  /**
   * Second useEffect hook to update the
   * jobs array state associate to the student's application
   */
  useEffect(() => {
    if (!applications || applications.length <= 0) {
      return;
    }
    /**
     * Fetches and sets jobs related to the applications.
     */
    const fetchAndSetJobs = async () => {
      if (applications.length > 0) {
        try {
          const jobPromises = applications.map((application) =>
            TAJobService.getTAJobById(parseInt(application.taJobId))
          );
          const jobDetails = await Promise.all(jobPromises);
          setJobs(jobDetails.map((response) => response.data));
        } catch (error) {
          console.error('Error fetching applications:', error);
        }
      }
    };

    fetchAndSetJobs();
  }, [applications]);

  /**
   * Combine the jobs array state and application array state with
   * customized JSON used as elements in the array.
   * @param jobs the jobs to be combined
   * @param applications the applications to be combined
   * @returns an array of customized information being stored in JSON
   */
  const createCustomArray = (jobs: Job[], applications: Application[]) => {
    if (!applications) {
      return [];
    }
    return applications
      .map((application) => {
        const job = jobs.find((job) => job.id === application.taJobId);

        if (job) {
          return {
            courseCode: job.course.courseCode,
            title: job.title,
            applicationId: application.id,
          };
        }

        return null;
      })
      .filter((item) => item !== null);
  };

  // Create customArray and only use the first 3 elements.
  const customArray = createCustomArray(jobs, applications);

  function handleUploadClick() {
    document.getElementById('profileUpload')?.click();
  }

  /**
   * Change if the full list was to be shown.
   */
  function toggleFullList() {
    setShowFullList(!showFullList);
  }

  /**
   * Handle image file upload
   * @param event Detect DOM being changed from HTML
   */
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    // Handle image file upload
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

  // Handle resume file upload
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

  /**
   * Check the application status based on the input application ID.
   * @param applicationId The application ID to be checked with
   */
  function handleCheckStatus(applicationId: string) {
    const application = applications.find((app) => app.id === applicationId);

    if (application) {
      setSelectedApplicationStatus(application.status);
      setSelectedApplicationId(applicationId);
    } else {
      setSelectedApplicationStatus('Invalid');
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
        My Student Dashboard
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
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
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <Button
                  component={Link}
                  to="/view-applications"
                  variant="contained"
                  color="primary"
                  sx={{ width: '100%' }}
                >
                  View Applications
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
        <Grid item xs={12} sm={6}>
          {/* Right section with Job Boxes using Box components */}
          {/* These boxes should be active applications or open positions that you've filled*/}
          <Box
            sx={{
              margin: '10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {customArray.length > 0 ? (
              customArray.map((application, index) =>
                application ? (
                  <div
                    key={index}
                    style={
                      index >= 3 && !showFullList ? hiddenStyle : visibleStyle
                    }
                  >
                    <Paper
                      key={index}
                      elevation={3}
                      sx={{ spacing: 2, padding: 2, mb: 2, width: '100%' }}
                    >
                      <Typography variant="h6">
                        Application title: {application.title}
                      </Typography>
                      <Typography>Course: {application.courseCode}</Typography>
                      <Typography>
                        Application ID: {application.applicationId}
                      </Typography>
                      <Box
                        sx={{
                          mt: '5px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'start',
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            handleCheckStatus(application.applicationId)
                          }
                        >
                          Check Application Status
                        </Button>
                        {selectedApplicationId ===
                          application.applicationId && (
                          <Typography sx={{ marginLeft: 2 }}>
                            {selectedApplicationStatus}
                          </Typography>
                        )}
                      </Box>
                    </Paper>
                  </div>
                ) : null
              )
            ) : (
              <Paper
                elevation={3}
                sx={{ spacing: 2, padding: 2, width: '100%' }}
              >
                <Typography variant="h6">Start applying now!</Typography>
              </Paper>
            )}
            <Button
              onClick={toggleFullList}
              color="primary"
              variant="contained"
            >
              {showFullList ? (
                <>
                  <ArrowUpwardIcon /> Show Less
                </>
              ) : (
                <>
                  <ArrowDownwardIcon /> Show More
                </>
              )}
            </Button>
            {/* <Button
              component={Link}
              to="/home"
              color="primary"
              variant="contained"
            >
              Click here to see full list!
            </Button> */}
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
