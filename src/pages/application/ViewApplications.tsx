import Fuse from 'fuse.js';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import MockResume from '../MockResume'; //This import is used so that we can display additional application details for a particular applicant
import {
  Container,
  Title,
  Navbar,
  NavbarButton,
} from '../user/styledComponents';
import AuthService from '../../services/auth';
import styled from 'styled-components';
// Define the data structure for a TA Application entry that we will get from database
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


// Create a styled component for the search input
const SearchInput = styled.input`
  padding: 10px; // Adjust padding as needed
  margin-bottom: 10px; // Adjust margin as needed
  border: 1px solid #ccc; // Adjust border as needed
  border-radius: 4px; // Adjust for rounded corners
  font-size: 16px; // Adjust font size as needed
  // Add more styling here to match your NavbarButton
`;
//styled button for making TA
const MakeTaButton = styled.button`
  padding: 10px;
  margin-top: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

//this is the ViewApplications component
const ViewApplications: React.FC = () => {
  //this is the state for the applications
  const [applications, setApplications] = useState<TAApplicationData[]>([]);
  //The below stores the current selected applications
  const [currentApplication, setCurrentApplication] = useState<TAApplicationData | null>(null);
  const [facultyFilter, setFacultyFilter] = useState<number | null>(null);
  const [selectionModel, setSelectionModel] = useState<number[]>([]);




  // XGrid definitions
  const columns = [
    { field: 'studentId', headerName: 'Student ID', width: 150, filterable: true },
    { field: 'courseId', headerName: 'Course ID', width: 130, filterable: true },
    { field: 'hoursCanWorkPerWeek', headerName: 'Hours/Week', width: 130, filterable: true },
    { field: 'coursesTaken', headerName: 'Courses Taken', width: 200, filterable: true },
    { field: 'GPA', headerName: 'GPA', width: 100, filterable: true },
    { field: 'requiredCourses', headerName: 'Required Courses', width: 200, filterable: true },
    { field: 'requiredSkills', headerName: 'Required Skills', width: 200, filterable: true },
    { field: 'resumeFile', headerName: 'Resume', width: 150, filterable: true },
    { field: 'taJobId', headerName: 'TA Job ID', width: 130, filterable: true },
    { field: 'TAStats', headerName: 'TA Stats', width: 150, filterable: true },
    { field: 'status', headerName: 'Status', width: 120, filterable: true },
  ];
  // This is the data that will be displayed in the XGrid
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
  })).filter((app) => {
    return app.courseId == 3; // Makes sure that the applications for only one student are shown
    // Change later to base on currently logged in student
  });
  const [searchText, setSearchText] = useState('');
  const [filterModel, setFilterModel] = useState({});
  const [originalApplications, setOriginalApplications] = useState<TAApplicationData[]>([]);

  const onRowsSelectionHandler = (ids: (number | string)[]) => {
    // Select Student from row
    setSelectionModel(ids.map(Number));
  };
  




  // Fetching the data from the API
  useEffect(() => {
    // This function will be called when the component mounts for the first time
    const fetchApplications = async () => {
      const taApplications = await AuthService.getTaApplication();
      setApplications(taApplications);
      setOriginalApplications(taApplications); // Set the original applications
    };
  
    fetchApplications();
  }, []);

  const makeTA = async () => {
    if (selectionModel.length > 0) {
      //get first selected if more than 1 is selected
      const selectedApplicationId = selectionModel[0];
      //get application from grid
      const selectedApplication = rows.find(row => row.id === selectedApplicationId);
      console.log(selectedApplication);
      if (selectedApplication) {
        try {
          // api endpoint
          const endpoint = `/student/${selectedApplication.studentId}/course/${selectedApplication.courseId}/make-ta`;
  
          //POST to backend
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (!response.ok) throw new Error('Error');
          alert('Student has been made a TA successfully!');
        } catch (error) {
          console.error('Error making student a TA:', error);
          alert('Failed to make the student a TA. Please try again.');
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
      keys: ['studentId', 'courseId', 'hoursCanWorkPerWeek', 'GPA', 'coursesTaken', 'requiredCourses', 'requiredSkills', 'resumeFile', 'taJobId', 'TAStats', 'status'],
      includeScore: true,
    });

    const results = fuse.search(searchValue);
    const filteredApplications = results.map(result => result.item);
    setApplications(filteredApplications); // Update applications state with search results
  };

  //This section involves the formatting and rendering of al the data and logic defined above.
  return (
    <Container>
      <Navbar>
        <NavbarButton
          onClick={() => {
            // You can add an onClick handler here, if you want the button to navigate or perform an action.
          }}
        >
          View TA Applications
        </NavbarButton>
        <NavbarButton
          onClick={() => {
            // View Applications from Faculty 1's Point of View if he were logged in
            setFacultyFilter(1);
          }}
        >
          Faculty 1 Log In View
        </NavbarButton>
        <NavbarButton
          onClick={() => {
            // Clear the faculty filter.
            setFacultyFilter(null);
          }}
        >
          Clear Faculty Filter
        </NavbarButton>
      </Navbar>
      <Title>View Applications for Course</Title>



      {/* Search Bar for Fuzzy Search */}
      <SearchInput
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={handleSearch}
      />

      {/* DataGrid with filterModel */}
      <DataGrid
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
      {/* Button to make student TA*/}
      <MakeTaButton onClick={makeTA}>Make TA</MakeTaButton>

      
      <div>
        {/*The below displays additional application details for the selected application */}
        {currentApplication && <MockResume application={currentApplication} />}
      </div>
    </Container>
  );
};

export default ViewApplications;
