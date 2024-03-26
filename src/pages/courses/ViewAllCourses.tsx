import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, TextField, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import CourseService from '../../services/course';
import { courseData } from './courseData';


const ViewAllCourses: React.FC = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState<courseData[]>([]);
    const [filterModel, setFilterModel] = useState({});

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await CourseService.getAllCourses();
                setCourses(response);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);



    const handleAddNewCourse = () => {
        navigate('/add-course');
    };

    const columns: GridColDef[] = [
        { field: 'courseCode', headerName: 'Course Code', flex: 1 },
        { field: 'title', headerName: 'Title', flex: 2 },
        {
            field: 'details',
            headerName: 'Details',
            flex: 1,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewDetails(params.row.id)}
                    style={{ textTransform: 'none' }}
                >
                    View Details
                </Button>
            ),
        },
    ];


    const handleViewDetails = (courseId: number) => {
        navigate(`/view-course/${courseId}`);
    };


    return (
        <Container>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography
                    variant="h4"
                    color="primary"
                    margin="30px"
                    fontWeight="700"
                >All Courses</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAddNewCourse}
                    sx={{ textTransform: 'none', borderRadius: '5px', px: 4 }} // Increase px for wider button
                >
                    Add Course
                </Button>
            </Box>

            <Paper sx={{ minHeight: '400px' }}>
                <DataGrid
                    rows={courses}
                    columns={columns}
                    filterModel={{
                        items: [],
                        ...filterModel,
                    }}
                    onFilterModelChange={model => setFilterModel(model)}
                />
            </Paper>
        </Container>
    );
};

export default ViewAllCourses;