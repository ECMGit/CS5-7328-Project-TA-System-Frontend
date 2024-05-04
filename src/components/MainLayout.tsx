// FREE FOR OTHER TEAMS TO USE AS WELL
import { Box, Button, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from '../provider';
import AvatarWrapper from './AvatarWrapper';

export const MainLayout = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    return <div>Loading...</div>; // or any other fallback UI
  }

  const { user, setUser } = userContext;

  const navigate = useNavigate();

  const handleLogout = function () {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/home-default');
  };

  useEffect(() => {
    // Retrieve the 'user' data from local storage, parsing it from JSON, or default to 'null'.
    const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
    // Set the 'user' state with the retrieved user data.
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  /**
   * Navigate to the corresponding user profile.
   */
  const handleProfile = function () {
    // Guard clause.
    if (!user) {
      return;
    }

    // Navigate to student/faculty profile.
    if (user.role === 'student') {
      navigate('/student-profile');
    } else if (user.role === 'faculty') {
      navigate('/faculty-profile');
    } else if (user.role === 'admin') {
      navigate('/admin-profile');
    }
  };
  return (
    <>
      <div
        style={{
          backgroundColor: '#1976D2',
          padding: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" style={{ color: '#FFF' }}>
          SMU Lyle School of Engineering Job Site
        </Typography>
        {/* show student Profile if the user log in as student  */}
        {/* {role === 'student' && (
          <Button onClick={navigateToStudentProfile} variant="contained" color="secondary">Student Profile</Button>
        )} */}
        {/* show falcuty if the user log in as faculty */}
        {/* {role === 'faculty' && (
          <Button onClick={navigateToFacultyProfile} variant="contained" color="secondary">Faculty Profile</Button>
        )} */}

        {/* <Button component={Link} to="/view-applications" variant="contained" color="secondary">
          View Applications
        </Button> */}
        <div style={{ marginLeft: 'auto' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {user.role === 'admin' ? (
                <>
                  <Button
                    component={Link}
                    to="/courses"
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '5px', marginRight: '5px' }}
                  >
                    View Courses
                  </Button>
                  <Button
                    component={Link}
                    to="/jobs"
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '5px', marginRight: '5px' }}
                  >
                    See Jobs
                  </Button>
                  <Button
                    component={Link}
                    to="/post-job"
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '10px' }}
                  >
                    Publish
                  </Button>
                  <Button
                    component={Link}
                    to="/view-applications"
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '5px', marginRight: '10px' }}
                  >
                    View Applications
                  </Button>

                  <Button
                    component={Link}
                    to="/create-task"
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '5px', marginRight: '10px' }}
                  >
                    Create Task
                  </Button>

                  <Button
                    component={Link}
                    to="/tasks/faculty"
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '5px', marginRight: '10px' }}
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
                    Display
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
                  {/* <Button
                    component={Link}
                    to="/view-applications"
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '5px', marginRight: '10px' }}
                  >
                    View Applications
                  </Button> */}
                </>
              ) : user.role === 'faculty' ? (
                <>
                  <Button
                    component={Link}
                    to="/jobs"
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '5px', marginRight: '5px' }}
                  >
                    See Jobs
                  </Button>
                  <Button
                    component={Link}
                    to="/view-applications"
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '5px', marginRight: '10px' }}
                  >
                    View Applications
                  </Button>
                </>
              ) : (
                ''
              )}
              <AvatarWrapper
                user={user}
                onLogout={handleLogout}
                onProfile={handleProfile}
              />
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
      <Box padding={5} style={{ position: 'relative' }}>
        <img
          src="https://www.smu.edu/-/media/Site/DevelopmentExternalAffairs/MarketingCommunications/digital-marketing/students-hanging-dallas-hall.jpg?h=1333&iar=0&w=2000&hash=EAA3D7A0E96DA001440160E0ECB8643D"
          alt="SMU Dallas Hall"
          style={{
            zIndex: -1,
            width: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        />
        <Box
          borderRadius={1}
          boxShadow={3}
          bgcolor={'white'}
          zIndex={100}
          padding={2}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
