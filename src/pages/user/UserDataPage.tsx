import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import userService from '../../services/userQuery';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


// Note to self: use Collapsible table next time: https://mui.com/components/data-grid/rendering/#collapsible-table
const UserDataPage: React.FC = () => {
  //eslint-disable-next-line
  const [rows, setRows] = useState<any[]>([]);
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Order', description: 'Order of Creation', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'smuId',
      headerName: 'ID',
      type: 'number',
      width: 130,
    },
    {
      field: 'password',
      headerName: 'Password',
      description: 'Email of the user',
      sortable: false,
      width: 160,
      // valueGetter: (params: GridValueGetterParams) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'email',
      headerName: 'Email',
      description: 'Email of the user',
      sortable: false,
      width: 160,
      // valueGetter: (params: GridValueGetterParams) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      description: 'Phone number of the user',
      sortable: false,
      width: 160,
      // valueGetter: (params: GridValueGetterParams) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];


  // Load all user data from the backend when the component mounts
  useEffect(() => {
    const getAllUserData = async () => {
      try {
        const response = await userService.getAllUsersData();
        setRows(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllUserData(); // Call the function to load data
  }, []); // Empty dependency array ensures this effect runs once on component mount

  

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '00px' }}>
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
