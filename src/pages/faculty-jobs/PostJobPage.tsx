import React, { useContext, useEffect } from 'react';
import { useState, FormEvent } from 'react';
import { Link, Link as RouterLink, useNavigate } from 'react-router-dom';
import { backendURL } from '../../config';
import { Container, Typography, Avatar, Box, Input, TextField, FormHelperText, Button, Select, InputLabel, MenuItem, FormControl } from '@mui/material';
import { LoadingButton } from '@mui/lab';



import api from '../../services/faculty-job';
import TopNav from '../../components/TopNav';
import AvatarWrapper from '../../components/AvatarWrapper';
import AdminDashboard from '../AdminDashboard';
import TAJobDisplayComponent from '../TAJobDisplayComponent';
import { UserContext } from '../../provider';

interface Course {
  courseID: number;
  courseCode: string;
  title: string;
}

const PostJob: React.FC = () => {
  // State hooks for form fields and validation errors
  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courseSchedule, setCourseSchedule] = useState('');
  const [totalHour, setTotalHour] = useState('');
  const [maxTaCount, setMaxTaCount] = useState('');
  const [requiredCourses, setRequiredCourse] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [TaStats, setTaStats] = useState('');
  const [notes, setNotes] = useState('');
  const [deadline, setDeadline] = useState('');

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [courseIdError, setCourseIdError] = useState('');
  const [requiredCoursesError, setRequiredCoursesError] = useState('');

  const userContext = useContext(UserContext);
  if (!userContext) {
    return <div>Loading...</div>; // or any other fallback UI
  }

  // User state
  const { user, setUser } = userContext;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /**
  * Log out the user, delete user from localStorage
  */
  const handleLogout = function () {
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    navigate('/home-default');
  };

  /**
   * Navigate to the corresponding user profile. 
   */
  const handleProfile = function () {
    // Guard clause.
    if (!user) { return; }

    // Navigate to student/faculty profile.
    if (user.role === 'student') { navigate('/student-profile'); }
    else if (user.role === 'faculty') { navigate('/faculty-profile'); }
    else if (user.role === 'admin') { navigate('/admin-profile'); }
  };

  const renderContent = () => {
    // When the user is an administrator, display the AdminDashboard component
    if (user && user.role === 'admin') {
      return <AdminDashboard />;
    } else {
      // Content displayed by non administrator users
      return (
        <>
          {/* If the user is a student, display their work list */}
          {user && user.role === 'student' && (
            <Container maxWidth='sm' style={{ marginTop: '20px' }}>
              <TAJobDisplayComponent />
            </Container>
          )}
        </>
      );
    }
  };


  // Available courses
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function fetchAvailableCourses() {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`
        };
        const response = await fetch(`${backendURL}/course/nodetails`, {
          headers: headers
        });

        if (!response.ok) {
          throw new Error('Failed to fetch available courses');
        }
        const courses = await response.json();
        setAvailableCourses(courses);
      } catch (error) {
        console.error('Error fetching available courses:', error);
      }
    }

    fetchAvailableCourses();
  }, []);

  const checkAlphanumeric = (input: string): boolean => {
    // Check each character of the input
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      if (!(char > 47 && char < 58) && // numeric (0-9)
        !(char > 64 && char < 91) && // upper alpha (A-Z)
        !(char > 96 && char < 123)) { // lower alpha (a-z)
        return false; // non-alphanumeric character found
      }
    }
    return true; // only alphanumeric characters
  };
  // Handler for changes in the Course ID field
  // Handler for changes in the Required Courses field
  // const handleRequiredCoursesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const input = event.target.value;
  //   if (checkAlphanumeric(input)) {
  //     setRequiredCourse(input);
  //     setRequiredCoursesError('');
  //   } else {
  //     setRequiredCoursesError('Required Course must only contain letters and numbers.');
  //   }
  // };

  const navigate = useNavigate();

  const storedUser = localStorage.getItem('user');


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 阻止默认提交
    setLoading(true);

    const userId = JSON.parse(storedUser!).id;
    console.log(new Date(deadline));
    api.postJob({
      title: title,
      courseId: parseInt(courseId),
      courseSchedule: courseSchedule,
      totalHoursPerWeek: parseInt(totalHour),
      maxNumberOfTAs: parseInt(maxTaCount),
      requiredCourses: requiredCourses,
      requiredSkills: requiredSkills,
      TAStats: TaStats,
      notes: notes,
      deadlineToApply: new Date(deadline),
      facultyId: userId
    }).then(
      () => {
        navigate('/job-success');
        //window.location.reload();
      }, (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      });
  };


  // JSX for rendering the form
  return (
    <>
      {/* Navigation Bar division */}
      <div>
        {/* Blue banner with "Login" button */}
        <div
          style={{
            backgroundColor: '#1976D2',
            padding: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" style={{ color: '#FFF' }}>
            Post Job
          </Typography>
          <div style={{ marginLeft: 'auto' }}>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>

                {user.role === 'admin' ? (
                  <>
                    <Button
                      component={Link}
                      to="/view-courses"
                      variant="contained"
                      color="secondary"
                      style={{ marginLeft: '10px', marginRight: '5px' }}
                    >
                      View Courses
                    </Button>
                    <Button
                      component={Link}
                      to="/view-applications"
                      variant="contained"
                      color="secondary"
                      style={{ marginLeft: '5px', marginRight: '5px' }}
                    >
                      View Applications
                    </Button>
                    <Button
                      component={Link}
                      to="/post-job"
                      variant="contained"
                      color="secondary"
                      style={{ marginLeft: '5px', marginRight: '5px' }}
                    >
                      Publish
                    </Button>

                    <Button
                      component={Link}
                      to="/create-task"
                      variant="contained"
                      color="secondary"
                      style={{ marginLeft: '5px', marginRight: '5px' }}
                    >
                      Create Task
                    </Button>

                    <Button
                      component={Link}
                      to="/tasks/faculty"
                      variant="contained"
                      color="secondary"
                      style={{ marginLeft: '5px', marginRight: '5px' }}
                    >
                      View Tasks
                    </Button>
                  </>
                ) : user.role === 'student' ? (
                  <>
                    <Button
                      component={Link}
                      to="/jobs"
                      variant="contained"
                      color="secondary"
                      style={{ marginLeft: '5px', marginRight: '10px' }}
                    >
                      View Available Jobs
                    </Button>
                    <Button
                      component={Link}
                      to="/tasks/student"
                      variant="contained"
                      color="secondary"
                      style={{ marginLeft: '5px', marginRight: '5px' }}
                    >
                      View Tasks
                    </Button>
                    <Button
                      component={Link}
                      to="/view-applications"  // Should be navigate to view my applications page (Student only)
                      variant="contained"
                      color="secondary"
                      style={{ marginLeft: '5px', marginRight: '5px' }}
                    >
                      View My Applications
                    </Button>

                  </>
                ) : user.role === 'faculty' ? (
                  <>
                    <Button
                      component={Link}
                      to="/post-job"
                      variant="contained"
                      color="secondary"
                      style={{ marginLeft: '10px', marginRight: '5px' }}
                    >
                      Post Job
                    </Button>
                    <Button
                      component={Link}
                      to="/view-applications"
                      variant="contained"
                      color="secondary"
                      style={{ marginLeft: '5px', marginRight: '5px' }}
                    >
                      View Applications
                    </Button>
                  </>
                ) : (
                  ''
                )}
                <Button
                  component={Link}
                  to="/home"
                  variant='contained'
                  color="secondary"
                  style={{ marginLeft: '5px', marginRight: '15px' }}
                >
                  Home
                </Button>
                <AvatarWrapper user={user} onLogout={handleLogout} onProfile={handleProfile} />
              </div>
            ) : (
              <Button
                component={Link}
                to="/login"
                variant="contained"
                color="secondary"
                style={{ marginRight: '10px' }}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" mt={5} mb={1}>Create a Job</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2, }} >
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Job Title"
              sx={{ my: 1 }}
              required fullWidth autoComplete="name"
              onChange={(e) => {
                setTitle(e.target.value);
              }} autoFocus
            />
            <FormControl fullWidth required error={!!courseIdError} sx={{ my: 1 }}>
              <InputLabel>Select a Course</InputLabel>
              <Select
                label="course-select-label"
                labelId="course-select-label"
                value={courseId}
                onChange={(e) => {
                  setCourseId(e.target.value);
                }}
                displayEmpty
                autoFocus
              >
                {availableCourses.map((course) => (
                  <MenuItem key={course.courseID} value={course.courseID}>
                    {course.courseCode} - {course.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Course Schedule"
              sx={{ my: 1 }}
              required fullWidth onChange={(e) => { setCourseSchedule(e.target.value); }} />
            <TextField
              label="Total Hour"
              sx={{ my: 1 }}
              required
              fullWidth
              type="number"
              inputProps={{ min: 0 }}
              error={!totalHour || isNaN(Number(totalHour))}
              helperText={!totalHour || isNaN(Number(totalHour)) ? 'Total Hour must be a number' : ''}
              onChange={(e) => { setTotalHour(e.target.value); }}
            />
            <TextField
              label="Max TA Count"
              sx={{ my: 1 }}
              required
              fullWidth
              type="number"
              inputProps={{ min: 0 }}
              error={!maxTaCount || isNaN(Number(maxTaCount))}
              helperText={!maxTaCount || isNaN(Number(maxTaCount)) ? 'Max TA Count must be a number' : ''}
              onChange={(e) => { setMaxTaCount(e.target.value); }}
            />
            {/* <TextField
            label="Required Course"
            margin="normal"
            required
            fullWidth
            autoComplete="off"
            value={requiredCourses}
            onChange={handleRequiredCoursesChange}
            error={!!requiredCoursesError}
            helperText={requiredCoursesError}
            /> */}
            <FormControl fullWidth required error={!!requiredCoursesError} sx={{ my: 1 }}> {/* Apply vertical margin */}
              <InputLabel>Select a Prerequisite Course</InputLabel>
              <Select
                label="required-courses-select-label"
                value={requiredCourses}
                onChange={(e) => {
                  setRequiredCourse(e.target.value);
                }}
                displayEmpty
                autoFocus
              // The FormControl wrapper has margin applied, so no need to apply it directly to Select
              >
                {availableCourses.map((course) => (
                  <MenuItem key={course.courseCode} value={course.courseCode}>
                    {course.courseCode} - {course.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField label="Required Skills" required fullWidth sx={{ my: 1 }} onChange={(e) => setRequiredSkills(e.target.value)} />
            <TextField label="TA Stats" required fullWidth sx={{ my: 1 }} onChange={(e) => setTaStats(e.target.value)} />
            <TextField label="Notes" fullWidth sx={{ my: 1 }} onChange={(e) => setNotes(e.target.value)} />
            <TextField label="Deadline" required fullWidth sx={{ my: 1 }} onChange={(e) => setDeadline(e.target.value)} />
            <LoadingButton type="submit" variant="contained" loading={loading} sx={{ mt: 4, mb: 3 }}>Publish Job</LoadingButton>
            <Button component={RouterLink} variant="text" to='/jobs' sx={{ mt: 4, mb: 3 }} >Cancel</Button>
            <FormHelperText>{message}</FormHelperText>
          </Box>
        </Box>
      </Container>
    </>
  );

};

export default PostJob;
