import React, { useState, useEffect, useContext, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import Fuse from 'fuse.js';
import { AppBar, Toolbar, Typography, Button, Container, List, ListItemButton, ListItemText, MenuItem, Menu, TextField, Box, Paper } from '@mui/material';
import CustomModal from '../../components/CustomModal';
import AuthService from '../../services/auth';
import styled from 'styled-components';
import MockResume from '../MockResume';
import { Link } from 'react-router-dom';
import AvatarWrapper from '../../components/AvatarWrapper';
import { UserContext } from '../../provider';
import AdminDashboard from '../AdminDashboard';
import TAJobDisplayComponent from '../TAJobDisplayComponent';
import TopNav from '../../components/TopNav';
import useAutoLogout from '../../components/AutoLogOut';

// const options = [
//   'Course 1',
//   'Course 2',
//   'Course 3',
// ];

export type TAApplicationData = {
  //id is the primary key for the table
  id: number;
  courseId: number;
  studentId: number;
  hoursCanWorkPerWeek: number;
  coursesTaken: string;
  GPA: number;
  requiredCourses: string;
  requiredSkills: string;
  resumeFile: string;
  taJobId: number;
  TAStats: string;
  status: string;
};
const SearchInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;


const MakeTaButton = styled.button`
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #4caf50; 
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  position: relative;
  margin-top: 10px;
`;

const ButtonColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-left: 20px;
  margin-right: 20px;
`;

const ButtonWrapper = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1px 0;
`;

// const FirstButtonWrapper = styled(ButtonWrapper)`
//   margin-top: 52px;
// `;

const ViewApplicationsbyFacultyID: React.FC = () => {
  const navigate = useNavigate();
  







  const { Modal } = useAutoLogout();
  const [isOpen, setIsOpen] = useState(false); // State to control the CustomModal visibility
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null); // Store timeout ID for clearing
  const [applications, setApplications] = useState<TAApplicationData[]>([]);
  //The below stores the current selected applications
  const [currentApplication, setCurrentApplication] =
    useState<TAApplicationData | null>(null);
  const [facultyFilter, setFacultyFilter] = useState<number | null>(null);
  const [selectionModel, setSelectionModel] = useState<number[]>([]);
  const [searchText, setSearchText] = useState('');
  const timeoutIdRef = useRef<number | null>(null);
  //logout timer
  const logoutTimerRef = useRef<number | null>(null);
  //Menu related functions
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);

  // User context
  const userContext = useContext(UserContext);
  if (!userContext) {
    return <div>Loading...</div>; // or any other fallback UI
  }

  const { user, setUser } = userContext;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logOutUser = () => {
    console.log('Logging out');
    localStorage.clear();
    navigate('/login');
  };

  // Define more functionality and hooks as needed

  useEffect(() => {
    let time: number;
    const resetTimer = () => {
      clearTimeout(time);
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
      setIsOpen(false);
      timeoutIdRef.current = null;
      time = window.setTimeout(() => {
        setIsOpen(true);
        timeoutIdRef.current = window.setTimeout(logOutUser, 6000); // 20 seconds until automatic logout
      }, 6000); // 10 minutes of inactivity allowed before showing modal
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      clearTimeout(time);
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    };
  }, []);

  // Handle "Stay Logged In" button click
  const handleStayLoggedIn = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsOpen(false);
    setTimeoutId(null);
  };
  
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const handleViewPerformanceClick = (applicationId: number) => {
    // Navigate to the performance page or handle the click event
    console.log('Viewing performance for application ID:', applicationId);
    // Example navigation (adjust the path as needed)
    navigate(`/performance/${applicationId}`); // Backend url may not be implemented yet
  };


  // Columns configuration for MUI DataGrid
  const columns = [
    {
      field: 'studentId',
      headerName: 'Student ID',
      width: 150,
      filterable: true,
    },
    {
      field: 'courseId',
      headerName: 'Course ID',
      width: 130,
      filterable: true,
    },
    {
      field: 'hoursCanWorkPerWeek',
      headerName: 'Hours/Week',
      width: 130,
      filterable: true,
    },
    {
      field: 'coursesTaken',
      headerName: 'Courses Taken',
      width: 200,
      filterable: true,
    },
    { field: 'GPA', headerName: 'GPA', width: 100, filterable: true },
    {
      field: 'requiredCourses',
      headerName: 'Required Courses',
      width: 200,
      filterable: true,
    },
    {
      field: 'requiredSkills',
      headerName: 'Required Skills',
      width: 200,
      filterable: true,
    },
    { field: 'resumeFile', headerName: 'Resume', width: 150, filterable: true },
    { field: 'taJobId', headerName: 'TA Job ID', width: 130, filterable: true },
    // { field: 'TAStats', headerName: 'TA Stats', width: 150, filterable: true },
    { field: 'status', headerName: 'Status', width: 120, filterable: true },
    // put View_performance button here, click to view student's
    {
      field: 'viewPerformance',
      headerName: 'View Performance',
      width: 180,
      renderCell: (cellValues: GridCellParams) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleViewPerformanceClick(cellValues.row.studentId)}
          >
            View Performance
          </Button>
        );
      },
    },
  ];

  // This is the data that will be displayed in the DataGrid
  const rows = applications.map((app) => ({
    id: app.id,
    studentId: app.studentId,
    courseId: app.courseId,
    hoursCanWorkPerWeek: app.hoursCanWorkPerWeek,
    coursesTaken: app.coursesTaken,
    GPA: app.GPA,
    requiredCourses: app.requiredCourses,
    requiredSkills: app.requiredSkills,
    resumeFile: app.resumeFile,
    taJobId: app.taJobId,
    TAStats: app.TAStats,
    status: app.status,
  }));

  const [filterModel, setFilterModel] = useState({});
  const [originalApplications, setOriginalApplications] = useState<
    TAApplicationData[]
  >([]);

  const onRowsSelectionHandler = (ids: (number | string)[]) => {
    // Select Student from row
    setSelectionModel(ids.map(Number));
  };

  // Fetching the data from the API
  useEffect(() => {
    const fetchApplicationsByFacultyId = async () => {
      try {
        const userId = AuthService.getCurrentUser()?.id; // Assuming getCurrentUser returns user object
        if (userId) {
          const taApplications = await AuthService.getTaApplicationsByFacultyId(userId);
          setApplications(taApplications);
          setOriginalApplications(taApplications);
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchApplicationsByFacultyId();
  }, []);

  const makeTA = async () => {
    if (selectionModel.length > 0) {
      const selectedApplicationId = selectionModel[0];
      const selectedApplication = rows.find(
        (row) => row.id === selectedApplicationId
      );

      // console.log('selcetedApplication', selectedApplication);

      if (selectedApplication) {
        try {
          const requestData = {
            studentId: selectedApplication.studentId,
            courseId: selectedApplication.courseId,
          };
          console.log('requestData', requestData);
          const endpoint = `http://localhost:9000/jobs/make-student-ta/${requestData.studentId}/${requestData.courseId}`;

          // const requestBody = JSON.stringify(requestData);
          // console.log('requestBody', requestBody);

          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            // body: requestBody,
          });

          if (!response.ok) {
            let errorMessage = 'Unknown error occurred';
            try {
              const errorResponse = await response.json();
              errorMessage = errorResponse.message || errorMessage;
              console.error('Server Error Response:', errorResponse);
            } catch (e) {
              console.log('Error parsing error response:', e);
            }
            throw new Error(errorMessage);
          } else {
            alert('Make TA seccessfully!');
          }
        } catch (error) {
          console.error('Error making student a TA:', error);
          alert(`Failed to make the student a TA. ${(error as Error).message}`);
        }
      } else {
        alert('Selected application not found.');
      }
    } else {
      alert('Please select a student first.');
    }
  };

  // Fuzzy search function
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchText(searchValue); // Update searchText state

    if (!searchValue) {
      setApplications(originalApplications); // Reset to original applications if search is cleared
      return;
    }

    // Initialize Fuse with the original, unfiltered applications
    const fuse = new Fuse(originalApplications, {
      keys: [
        'studentId',
        'courseId',
        'hoursCanWorkPerWeek',
        'GPA',
        'coursesTaken',
        'requiredCourses',
        'requiredSkills',
        'resumeFile',
        'taJobId',
        'TAStats',
        'status',
      ],
      includeScore: true,
    });

    const results = fuse.search(searchValue);
    const filteredApplications = results.map((result) => result.item);
    setApplications(filteredApplications); // Update applications state with search results
  };

  return (
    <>
      {/* Navigation Bar division */}
      {<TopNav/>}

        <CustomModal
        isOpen={isOpen}
        message="You've been inactive for a while. Do you want to continue your session?"
        onStay={handleStayLoggedIn}
        onLeave={() => navigate('/login')}
      />
      {/* Container for DataGrid and ButtonColumn */}
      <FlexContainer>
        <DataGrid
          style={{ width: '80%' }}
          rows={rows}
          columns={columns}
          filterModel={{
            items: [],
            ...filterModel,
          }}
          onFilterModelChange={(model) => setFilterModel(model)}
          checkboxSelection
          //onSelection go to handler
          onRowSelectionModelChange={onRowsSelectionHandler}
          rowSelectionModel={selectionModel}
        />
        <ButtonColumn>      
          {/* Button to make student TA*/}
          <MakeTaButton onClick={makeTA}>Make TA</MakeTaButton>

          {rows.map((row, index) => {
            // const Wrapper = index === 0 ? FirstButtonWrapper : ButtonWrapper;
            const Wrapper = ButtonWrapper;
            return (
              <Wrapper key={row.id}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#708090', color: '#fff' }}
                  onClick={() => handleViewPerformanceClick(row.id)}
                >
                  View Performance
                </Button>
              </Wrapper>
            );
          })}
        </ButtonColumn>
      </FlexContainer>

      {/* Displays additional application details for the selected application */}
      <div>
        {currentApplication && <MockResume application={currentApplication} />}
      </div>

        <List
          component="nav"
          aria-label="Device settings"
          sx={{ bgcolor: 'background.paper' }}
        >
          {/* <ListItemButton
            id="lock-button"
            aria-haspopup="listbox"
            aria-controls="lock-menu"
            aria-label="when device is locked"
            aria-expanded={open ? 'true' : undefined}
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            <ListItemText secondary={options[selectedIndex]} />
          </ListItemButton> */}
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {/* {options.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))} */}
      </Menu>
      <div>
      {/* Text box that spans the page, will fill it with about us and stuff BWG */}
      <Paper style={{ padding: '20px' }}>
        <Typography variant="body1">
          Welcome to CS5/7328 TA Job Site! This site is for SMU Lyle School of
          Engineering students to find TA jobs.
        </Typography>
      </Paper>
      </div>
      {Modal}
    </>
  );

};

export default ViewApplicationsbyFacultyID;
