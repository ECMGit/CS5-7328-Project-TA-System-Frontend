import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  useTheme,
  Button,
} from '@mui/material';
import axios, { AxiosError } from 'axios';
import AdminService from '../../services/admin';
import { useParams } from 'react-router-dom';
import { DataGrid, GridColDef, GridFilterModel } from '@mui/x-data-grid';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

export const statusStyles = {
    rejected: {
      borderColor: 'red',
      color: 'red',
      borderWidth: '2px',
      borderStyle: 'solid',
    },
    partiallyFilled: {
      borderColor: 'orange',
      color: 'orange',
      borderWidth: '2px',
      borderStyle: 'solid',
    },
    open: {
      borderColor: 'blue',
      color: 'blue',
      borderWidth: '2px',
      borderStyle: 'solid',
    },
  };

export type TAApplication = {
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
  TAtaJobId: number;
};

export type TAJob = {
  id: number;
  title: string;
  courseSchedule: string;
  courseId: number;
  totalHoursPerWeek: number;
  maxNumberOfTAs: number;
  TAStats: string;
};
export type CourseData = {
    courseCode: string;
    title: string;
    description: string;
  
  };

const ViewCourse: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [taJobs, setTaJobs] = useState<TAJob[]>([]);
   const [loading, setLoading] = useState(true);
  const [taApplication, setTaApplication] = useState<TAApplication[]>([]);
  const theme = useTheme();
  const [course, setCourse] = useState<CourseData | null>(null); 
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'courseId', headerName: 'CourseId', width: 130 },
    { field: 'GPA', headerName: 'GPA', width: 150 },
    { field: 'requiredCourses', headerName: 'RequiredCourses', width: 150 },
    { field: 'requiredSkills', headerName: 'RequiredSkills', width: 150 },
    {
        field: 'resumeFile',
        headerName: 'ResumeFile',
        width: 300,
        renderCell: (params) => (
          <Typography sx={{ textDecoration: 'underline' }}>
            {params.value}
          </Typography>
        ),
      },
    { field: 'status', headerName: 'Status', width: 150 },
  ];



  useEffect(() => {
    const fetchCourseDetailsApplication = async () => {
      if (id) {
        try {
          const response = await AdminService.getCourseDetail();
          setTaApplication(
            Array.isArray(response.data) ? response.data : []
          );
        } catch (error) {
          const axiosError = error as AxiosError;
          console.error(
            'Error fetching course details:',
            axiosError?.response?.data || error
          );
        }
      }
    };
    fetchCourseDetailsApplication();
  }, [id]);
  

  
  return (
    <Container>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
            }}
          >
            <Typography
              variant="h5"
              color="primary"
              margin="5px"
              fontWeight="700"
            >
           {course?.courseCode} Courses Detail
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ArrowBackRoundedIcon />}
              onClick={() => {
                window.history.back();
              }}
              sx={{ textTransform: 'none', borderRadius: '5px', px: 4 }} 
            >
              Back
            </Button>
          </Box>
      
      
      <Typography variant="h5" color="primary" margin="10px" fontWeight="800">
        {' '}
        TA Application List
      </Typography>
      <Paper sx ={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={taApplication}
          columns={columns} 
          filterModel={filterModel}
          onFilterModelChange={setFilterModel}
        />
      </Paper>
    </Container>
  );
};

export default ViewCourse;