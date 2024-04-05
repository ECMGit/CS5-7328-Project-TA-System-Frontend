import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Navbar,
  NavbarButton,
  Input,
} from '../user/styledComponents';
import AdminService from '../../services/admin';

export type CourseData = {
  id: number;
  courseCode: string;
  title: string;
  description: string;
};

export const ViewCourse: React.FC = () => {
  const [course, setCourse] = useState<CourseData[]>([]);
  const [searchID, setSearchID] = useState('');
  const [searchCourse, setSearchCourse] = useState('');
  const [CourseFilter, setCourseFilter] = useState<number | null>(null);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'courseCode', headerName: 'Course Code', width: 120 },
    { field: 'title', headerName: 'Title', width: 400 },
    { field: 'description', headerName: 'description', width: 250 },
  ];

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
        <NavbarButton onClick={() => {}}>View Course</NavbarButton>
        <NavbarButton
          onClick={() => {
            // Clear the Student filter.
            setCourseFilter(null);
          }}
        >
          Clear Faculty Filter
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
    </Container>
  );
};

export default ViewCourse;
