
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AvatarWrapper from '../components/AvatarWrapper';


interface NavbarProps {
    user: User; // Define the type for user
    handleLogout: () => void; // Define the type for handleLogout
    handleProfile: () => void; // Define the type for handleProfile
    handlePerformance: () => void; // Define the type for handlePerformance
    isHomePage: boolean;
  }

  interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    smuNo: string;
    year: string;
    avatarUrl: string;
    role: string;
  }
  

const Navbar: React.FC<NavbarProps> = ({ user, handleLogout, handleProfile, handlePerformance, isHomePage }) => {
  return (
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
                    to="/view-courses"
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
                    View Jobs
                  </Button>
                  <Button
                    component={Link}
                    to="/post-job"
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '10px' }}
                  >
                    Post Job
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
                  {/* Add a view performance button in the home page, just for student */}
                  <Button
                    onClick={() => handlePerformance()}
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '5px', marginRight: '5px' }}
                  >
                    View My Performance
                  </Button>
                  <Button
                    component={Link}
                    to="/view-applications"  // Should be navigate to view my applications page (Student only)
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '5px', marginRight: '10px' }}
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
                    to="/jobs"
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '5px', marginRight: '5px' }}
                  >
                    View Jobs
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
              {!isHomePage && (
                <Button component={Link} to="/home" variant="contained" color="secondary" style={{margin:'10px'}}>
                  Home
                </Button>
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
          )
          }
        </div>
      </div>
  );
};



export default Navbar;
