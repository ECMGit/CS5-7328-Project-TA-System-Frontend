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
import { useParams ,useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef, GridFilterModel ,GridToolbar } from '@mui/x-data-grid';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Chip from '@mui/material/Chip';


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

const ViewCourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [taJobs, setTaJobs] = useState<TAJob[]>([]);
  const [taApplication, setTaApplication] = useState<TAApplication[]>([]);
  const theme = useTheme();
  const [course, setCourse] = useState<CourseData | null>(null); 
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });
  const navigate = useNavigate();
  const columns: GridColDef[] = [
    { field: 'courseId', headerName: 'CourseId', width: 70 },
    { field: 'hoursCanWorkPerWeek', headerName: 'HoursCanWorkPerWeek', width: 170 },
    { field: 'GPA', headerName: 'GPA', width: 60 },
    { field: 'requiredCourses', headerName: 'RequiredCourses', width: 150 },
    { field: 'requiredSkills', headerName: 'RequiredSkills', width: 200 },
    { field: 'status', 
    headerName: 'Status', 
    width: 130,
    renderCell: (params) => {
      const status = params.value;
      let color: 'warning' | 'success' | 'primary';
      if (status === 'Rejected') {
        color = 'warning'; 
      } else if (status === 'Approved') {
        color = 'success'; 
      } else {
        color = 'primary'; 
      }
      return <Chip label={status} color={color} />;
    },
    },
  ];



  useEffect(() => {
    const fetchCourseDetailsTAjob = async () => {
      if (id) {
        try {
          const response = await AdminService.getCourseDetail(parseInt(id));
          setTaJobs(Array.isArray(response.TAJob) ? response.TAJob : []);
        
        } catch (error) {
          const axiosError = error as AxiosError;
          console.error(
            'Error fetching course details:',
            axiosError?.response?.data || error
          );
        }
      }
    };
    fetchCourseDetailsTAjob();
  }, [id]);

  useEffect(() => {
    const fetchCourseDetailsTAjob = async () => {
      if (id) {
        try {
          const response = await AdminService.getCourseDetail(parseInt(id));
          setCourse(response);
        
        } catch (error) {
          const axiosError = error as AxiosError;
          console.error(
            'Error fetching course details:',
            axiosError?.response?.data || error
          );
        }
      }
    };
    fetchCourseDetailsTAjob();
  }, [id]);


  
  useEffect(() => {
    const fetchCourseDetailsApplication = async () => {
      if (id) {
        try {
          const response = await AdminService.getCourseDetail(parseInt(id));
          setTaApplication(
            Array.isArray(response.TAApplication) ? response.TAApplication : []
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

  const handleEdit = () => {
    navigate(`/edit-course/${id}`);
};



  return (
    <Container  maxWidth="lg">
      <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    {course?.title}
                </Typography>
                <Box sx={{ mb: 1 }}>
                    <Typography variant="body1"><strong>Course Code:</strong> {course?.courseCode}</Typography>
                </Box>
                <Box sx={{ mb: 1 }}>
                    <Typography variant="body1"><strong>Description:</strong> {course?.description || 'No description available'}</Typography>
                </Box>
                {/* Edit Button */}
                <Button variant="contained" color="primary" onClick={handleEdit} sx={{ mt: 2 }}>
                    Edit
                </Button>
            </Paper>
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
      
      {taJobs?.map((job) => (
        <Paper
          key={job.id}
          elevation={3}
          sx={{
            p: 3,
            mt: 2,
            backgroundColor: theme.palette.background.paper,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ mb: 2, color: theme.palette.primary.main }}
          >
            <strong>TA Title:</strong> {job.title}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ mb: 2, color: theme.palette.primary.main }}
          >
            <strong>CourseSchedule: </strong> {job.courseSchedule}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ mb: 2, color: theme.palette.primary.main }}
          >
            <strong>TotalHoursPerWeek:</strong> {job.totalHoursPerWeek}
          </Typography>
        </Paper>
      ))}
      <Typography variant="h5" color="primary" margin="10px" fontWeight="800">
        {course?.courseCode} TA Application List
      </Typography>
        <DataGrid 
          rows={taApplication}
          columns={columns}
          filterModel={filterModel}
          checkboxSelection
          onFilterModelChange={setFilterModel}
          slots={{ toolbar: GridToolbar }} 
        />
    </Container>
  );
};

export default ViewCourseDetail;