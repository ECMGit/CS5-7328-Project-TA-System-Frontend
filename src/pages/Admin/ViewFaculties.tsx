import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import {
  Container,
  Titles,
  Navbar,
  NavbarButton,
  Input,
} from '../user/styledComponents'; // Ensure Input is correctly imported
import AdminService from '../../services/admin';

export type FacultyData = {
  UserId: number;
  designation: string;
  department: string;
  user: UserData;
};

export type UserData = {
  id: number;
  smuNo: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
};

const ViewFaculties: React.FC = () => {
  const [faculties, setFaculties] = useState<FacultyData[]>([]);
  const [searchID, setSearchID] = useState('');
  const [searchSmuID, setSearchSmuID] = useState('');
  const [searchName, setSearchName] = useState('');
  const [facultiesFilter, setFacultiesFilter] = useState<number | null>(null);
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'smuNo', headerName: 'SMU No', width: 130 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'designation', headerName: 'designation', width: 150 },
    { field: 'department', headerName: 'department', width: 150 },
  ];

  const rows = faculties
    .map((faculty) => ({
      id: faculty.user.id,
      smuNo: faculty.user.smuNo,
      username: faculty.user.username,
      email: faculty.user.email,
      firstName: faculty.user.firstName,
      lastName: faculty.user.lastName,
      designation: faculty.designation,
      department:faculty.department,

    }))
    .filter((row) => row.id.toString().includes(searchID))
    .filter(
      (row) =>
        row.firstName.toLowerCase().includes(searchName.toLowerCase()) ||
        row.lastName.toLowerCase().includes(searchName.toLowerCase())
    )
    .filter((row) => row.smuNo.toString().includes(searchSmuID));

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const fetchedFaculties = await AdminService.getFaculty();
        setFaculties(fetchedFaculties);
      } catch (error) {
        console.error('Failed to fetch faculties:', error);
      }
    };
    fetchFaculties();
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
        <NavbarButton
          onClick={() => {
            window.location.reload();
          }}
        >
          View Faculties
        </NavbarButton>
        <NavbarButton
          onClick={() => {
            // Clear the Student filter.
            setFacultiesFilter(null);
          }}
        >
          Clear Faculty Filter
        </NavbarButton>
      </Navbar>
      <Titles>All Faculty Information</Titles>
      <Input
        type="text"
        placeholder="Search by ID"
        value={searchID}
        onChange={(e) => setSearchID(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Search by SMU ID"
        value={searchSmuID}
        onChange={(e) => setSearchSmuID(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Search by Username"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        sx={{
          '& .MuiDataGrid-row': {
            backgroundColor: 'var(--row-background-color, #fff)',
            '&:hover': {
              backgroundColor: 'var(--row-hover-background-color, #f5f5f5)',
            },
          },
        }}
      />
    </Container>
  );
};

export default ViewFaculties;
