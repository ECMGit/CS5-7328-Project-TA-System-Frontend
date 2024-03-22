import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import axios, { AxiosError } from 'axios';
import CourseService from '../../services/course';

import { courseData } from './courseData';

const ViewCourse: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [course, setCourse] = useState<courseData | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const courseDetails = await CourseService.getOneCourse(id!);
                setCourse(courseDetails);
            } catch (error) {
                const axiosError = error as AxiosError;
                if (axiosError && axiosError.response) {
                    console.error('Error fetching course details:', axiosError.response.data);
                    setError('Failed to load course details. Please try again later.');
                } else {
                    console.error('An unexpected error occurred:', error);
                    setError('An unexpected error occurred. Please try again later.');
                }
            }
        };

        if (id) {
            fetchCourseDetails();
        }
    }, [id]);

    const handleEdit = () => {
        navigate(`/edit-course/${id}`);
    };

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (!course) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container>
            <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    {course.title}
                </Typography>
                <Box sx={{ mb: 1 }}>
                    <Typography variant="body1"><strong>Course Code:</strong> {course.courseCode}</Typography>
                </Box>
                <Box sx={{ mb: 1 }}>
                    <Typography variant="body1"><strong>Description:</strong> {course.description || 'No description available'}</Typography>
                </Box>
                {/* Edit Button */}
                <Button variant="contained" color="primary" onClick={handleEdit} sx={{ mt: 2 }}>
                    Edit
                </Button>
            </Paper>
        </Container>
    );
};

export default ViewCourse;
