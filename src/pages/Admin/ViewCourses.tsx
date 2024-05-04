import { DataGrid ,GridRenderCellParams } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Navbar,
  NavbarButton,
  Input,
} from '../user/styledComponents';
import { useNavigate } from 'react-router-dom';
import AdminService from '../../services/admin';
import {
  Typography,
} from '@mui/material';

export type CourseData = {
  id: number;
  courseCode: string;
  title: string;
  description: string;

};

export const ViewCourse: React.FC = () => {
  const navigate =useNavigate();
  const [course, setCourse] = useState<CourseData[]>([]);
  const [searchID, setSearchID] = useState('');
  const [searchCourse, setSearchCourse] = useState('');
  const [CourseFilter, setCourseFilter] = useState<number | null>(null);

  const columns  = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'courseCode', headerName: 'Course Code', width: 120 },
    { field: 'title', headerName: 'Title', width: 400 },
    { field: 'description', headerName: 'description', flex: 1 },
    {
      field: 'details',
      headerName: 'Details',
      width: 200,
      renderCell: (params :GridRenderCellParams) => {
        return (
          <NavbarButton onClick={() => handleViewDetails(params.row.id)}>View Details</NavbarButton>
        );
      },
    },
  ];
  const handleViewDetails =async  (id: number) => {
    const exists = await AdminService.getCourseDetail(id);
    if (!exists) {
      alert('Error: No TA job found for this course.'); 
      return;
    }
    // If a TA job exists, navigate to the course details
    navigate(`/course/${id}`);
  };


  const rows = course
    .map((course, index) => ({
      IndexId: index,
      id: course.id,
      courseCode: course.courseCode,
      title: course.title,
      description: course.description,
    }))
    .filter((row) => row.id.toString().includes(searchID))
    .filter(
      (row) =>
        row.courseCode.toLowerCase().includes(searchCourse.toLowerCase()) ||
        row.title.toLowerCase().includes(searchCourse.toLowerCase())
    );

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const CourseData = await AdminService.getCourse();
        if (CourseData && Array.isArray(CourseData)) {
          setCourse(CourseData);
        } else {
          // Handle the case where facultyData is not an array
          console.error('Data fetched is not an array:', CourseData);
        }
      } catch (error) {
        // Handle the error case
        console.error('Failed to fetch Course:', error);
      }
    };
    fetchCourse();
  }, []);


  const handleAddNewCourse = () => {
    navigate('/add-course');
};

  
  return (
    <Container>
      <Navbar>
        <NavbarButton
          onClick={() => {
            window.history.back();
          }}
        >
          Back
        </NavbarButton>
        <NavbarButton onClick={() => {  }}>View Course</NavbarButton>
        <NavbarButton onClick={() => {   setCourseFilter(null); }}>Clear fitter</NavbarButton>
        <NavbarButton
          onClick={handleAddNewCourse}
        >
          Add Course
        </NavbarButton>
      </Navbar>
      <Title>Course Information</Title>
      <Input
        type="text"
        placeholder="Search by Course ID"
        value={searchID}
        onChange={(e) => setSearchID(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Search by Course"
        value={searchCourse}
        onChange={(e) => setSearchCourse(e.target.value)}
      />
      
      <DataGrid rows={rows} columns={columns} checkboxSelection />
      <Title style={{ padding: '20px' }}>
        <Typography variant="body1">
          Welcome to CS5/7328 TA Job Site! This site is for SMU Lyle School of
          Engineering students to find TA jobs.
        </Typography>
      </Title>
    </Container>
    
  );
};

export default ViewCourse;
