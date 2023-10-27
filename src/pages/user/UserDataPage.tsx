import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import userService from '../../services/auth';
import { Typography, Container, Box } from '@mui/material';

const UserDataPage: React.FC = () => {
  // set the initial state of the data
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  //eslint-disable-next-line
  const [rows, setRows] = useState<any[]>([]);

  // set the columns for the table
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      description: 'Order of Creation',
      width: 70,
    },
    { field: 'smuNo', headerName: 'SMU No.', width: 120 },
    { field: 'username', headerName: 'Username', width: 120 },
    { field: 'email', headerName: 'Email', width: 120 },
    { field: 'firstName', headerName: 'First name', width: 120 },
    { field: 'lastName', headerName: 'Last name', width: 120 },
    { field: 'password', headerName: 'Password', width: 120 },
    { field: 'resetToken', headerName: 'Reset Token', width: 120 },
    { field: 'resetTokenExpiry', headerName: 'Reset Token Expiry', width: 120 },
    { field: 'updatedAt', headerName: 'Updated At', width: 120 },
  ];

  // fetch the data from the api
  useEffect(() => {
    const getAllUserData = async () => {
      try {
        // Replace userService.getUserById() with your actual service call
        const response = await userService.getUserData(); // Adjust the function name
        setRows(response.data);
        setLoading(false);
      } catch (err) {
        // setError(err);
        setLoading(false);
      }
    };
    getAllUserData();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '00px',
        }}
      >
        <Typography component="h1" variant="h5">
          User Data
        </Typography>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      </Box>
    </Container>
  );
};

export default UserDataPage;
